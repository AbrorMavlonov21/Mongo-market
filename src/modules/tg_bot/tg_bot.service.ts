/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot, Context, InlineKeyboard, Keyboard } from 'grammy';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { Model } from 'mongoose';
import { config } from '../../../config/index';
import { InputMediaPhoto, InputMediaVideo } from 'grammy/types';

@Injectable()
export class TgBotService {
  private readonly telegramBot: Bot<Context>;

  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductEntity>,
    @InjectModel(CartEntity.name) private readonly cartModel: Model<CartEntity>,
  ) {
    this.telegramBot = new Bot<Context>(config.TGBOT_TOKEN);
    this.initializeCommands();

    this.telegramBot.api.setMyCommands([
      { command: 'start', description: 'Start the Telegram bot' },
      { command: 'product', description: 'Show list of products' },
      { command: 'cart', description: "Show user's cart" },
    ]);
    this.telegramBot.start();
  }

  private initializeCommands() {
    this.telegramBot.callbackQuery('display_products', async (ctx) => {
      try {
        const availableProducts = await this.productModel.find();
        if (!availableProducts.length) {
          await ctx.reply('No products available at the moment.');
          await ctx.answerCallbackQuery();
          return;
        }

        const productKeyboard = new InlineKeyboard();
        availableProducts.forEach((product) => {
          productKeyboard.text(
            `${product.name} - ${product.price}`,
            `product_${product._id}`,
          );
        });

        await ctx.reply('Available Products:', {
          reply_markup: productKeyboard,
        });
        await ctx.answerCallbackQuery();
      } catch (error) {
        console.error('Error loading products:', error);
        await ctx.answerCallbackQuery('Error loading products.');
      }
    });

    this.telegramBot.callbackQuery(/^product_(.+)$/, async (ctx) => {
      const productId = ctx.match![1];
      try {
        const product = await this.productModel.findById(productId);
        if (!product) {
          await ctx.answerCallbackQuery('Product not found.');
          return;
        }

        const userCart = await this.cartModel.findOneAndUpdate(
          { userId: ctx.from!.id },
          {
            $push: { products: { productId, quantity: 1 } },
            $inc: { total: product.price },
          },
          { upsert: true, new: true },
        );

        await ctx.reply(`Product added to cart.\nUse /cart to view your cart.`);
        await ctx.answerCallbackQuery();
      } catch (error) {
        console.error('Error adding product to cart:', error);
        await ctx.answerCallbackQuery('Error adding product to cart.');
      }
    });

    this.telegramBot.command('cart', async (ctx) => {
      const userId = ctx.from!.id;
      try {
        const cart = await this.cartModel
          .findOne({ userId })
          .populate({ path: 'products.productId', model: this.productModel });

        if (!cart || !cart.products.length) {
          await ctx.reply('Your cart is empty.');
          return;
        }

        const productSummary = cart.products.reduce((acc: any, item: any) => {
          const productId = item.productId._id.toString();
          if (acc[productId]) {
            acc[productId].quantity += item.quantity;
          } else {
            acc[productId] = {
              productId: item.productId,
              quantity: item.quantity,
            };
          }
          return acc;
        }, {});

        let cartText = 'Products in your cart:\n\n';
        let totalAmount = 0;

        Object.values(productSummary).forEach((item: any, index: number) => {
          const product = item.productId;
          cartText += `${index + 1}. ${product.name} - ${item.quantity} x ${product.price} \n`;
          totalAmount += item.quantity * product.price;
        });

        cartText += `\nTotal: ${totalAmount} `;

        await ctx.reply(cartText);
      } catch (error) {
        console.error('Error viewing cart:', error);
        await ctx.reply('Error viewing cart.');
      }
    });

    this.telegramBot.command('start', async (ctx) => {
      const languageKeyboard = new Keyboard()
        .text('uz')
        .text('en')
        .row()
        .resized()
        .oneTime();
      await ctx.reply('Welcome to our bot! Please select your language.', {
        reply_markup: languageKeyboard,
      });
    });

    this.telegramBot.on('message:text', async (ctx) => {
      const userName = ctx.from.first_name;
      const chatId = ctx.chat.id;
      if (ctx.message.text.startsWith('/')) {
        console.log(`Command received: ${ctx.message.text}`);
        return;
      }

      try {
        const existingUser = await this.userModel.findOne({ chatId });
        if (existingUser) {
          await ctx.reply(
            `Welcome back, ${existingUser.username}\nClick the button below to view products.`,
            {
              reply_markup: new InlineKeyboard().text(
                'Products',
                'display_products',
              ),
            },
          );
          return;
        }

        const newUser = await this.userModel.create({
          username: userName,
          chatId,
          language: 'uz',
        });

        await ctx.reply(
          `Hello, ${newUser.username}\nClick the button below to view products!`,
          {
            reply_markup: new InlineKeyboard().text(
              'Products',
              'display_products',
            ),
          },
        );
      } catch (error) {
        console.error('Error saving user:', error);
        await ctx.reply('Sorry, there was an error in the system.');
      }
    });
  }
}

import { Module } from '@nestjs/common';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { EmailModule } from './email/email.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FilesModule } from './files/files.module';
import { SliderModule } from './slider/slider.module';
import { ProductsFiltersModule } from './products-filters/products-filters.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SmtpSettingsModule } from './smtp-settings/smtp-settings.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    EmailModule,
    EmailConfirmationModule,
    OrdersModule,
    ProductsModule,
    UserModule,
    FavoriteModule,
    FilesModule,
    SliderModule,
    ProductsFiltersModule,
    FeedbackModule,
    SmtpSettingsModule,
  ],
})
export class ApiModule {}

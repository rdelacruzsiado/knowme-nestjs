import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  jwtSecret: process.env.JWT_SECRET,
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  },
}));

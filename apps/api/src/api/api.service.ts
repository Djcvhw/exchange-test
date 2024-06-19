import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { common } from 'common-types';

@Injectable()
export class ApiService {
  private readonly authServiceUrl =
    'http://localhost:3021/auth/server-validate'; // URL to the auth service

  constructor(private readonly httpService: HttpService) {}

  async validateToken(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.authServiceUrl, {
          headers: { Authorization: token },
        }),
      );
      return response.data.valid;
    } catch (error) {
      return false;
    }
  }

  getProfile() {
    return {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    };
  }

  getDashboard() {
    return {
      transactions: faker.number.int({ max: 100 }),
      balance: faker.finance.amount({
        min: 5,
        max: 10000,
        dec: 2,
        // symbol: '$',
      }),
    };
  }

  getAbout(): common['AboutContent'] {
    return {
      image: faker.image.urlLoremFlickr({ category: 'abstract' }),
      content: faker.lorem.paragraphs(5),
    };
  }
}

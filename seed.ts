import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import adminsRepo from "./api/Admin/AdminRepository";
import investorRepo from "./api/Investor/InvestorRepository";
import propertiesRepo from "./api/Property/PropertyRepository";
import { startDB, stopDB } from "./database";
import { UserType, PropType } from "./enums";
import { IInvestor, IProperty } from "./database/models";
import faker from "./lib/faker";

let investors: IInvestor[];
let investorOneProperties: IProperty[];
let investorTwoProperties: IProperty[];

async function seedAdmin(): Promise<void> {
  const password = await bcrypt.hash("123123123", 10);
  await adminsRepo.create({
    password,
    type: "superAdmin",
    name: "sakan admin",
    email: "superadmin@sakan.me"
  });
  console.log("seeded Admin");
}

async function seedInvestors(): Promise<void> {
  const password = await bcrypt.hash("123123123", 10);
  investors = await Promise.all([
    investorRepo.create({
      password,
      userType: UserType.Investor,
      firstName: "Investor",
      lastName: "One",
      email: "investorone@sakan.me",
      phoneNumber: "123456789",
      gender: "male",
      isVerified: true
    }),
    investorRepo.create({
      password,
      userType: UserType.Investor,
      firstName: "Investor",
      lastName: "Two",
      email: "investortwo@sakan.me",
      phoneNumber: "123456788",
      gender: "male",
      isVerified: true
    })
  ]);
  console.log("seeded Investors");
}

async function seedProperty(owner: string): Promise<any> {
  return propertiesRepo.create({
    owner,
    propType: faker.helpers.randomize(Object.values(PropType)),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country()
    },
    description: faker.lorem.paragraph(),
    bedroomNum: faker.random.number(10),
    bathroomNum: faker.random.number(10),
    unitArea: faker.random.number(3000),
    rentValue: faker.random.number(10000),
    isApproved: true
  });
}

async function seedProperties() {
  investorOneProperties = await Promise.all(
    Array(10)
      .fill(null)
      .map(() => seedProperty(investors[0].id))
  );
  investorTwoProperties = await Promise.all(
    Array(10)
      .fill(null)
      .map(() => seedProperty(investors[1].id))
  );
  console.log("Seeded Properties");
}

async function updateOwners(): Promise<void> {
  // To-do mesh rady ye addToSet ??
  await Promise.all(
    investorOneProperties.map(p =>
      investorRepo.setUpdateById(investors[0].id, {
        $addToSet: { ownedProps: p.id }
      })
    )
  );
  console.log("Updated Investor One");
  await Promise.all(
    investorTwoProperties.map(p =>
      investorRepo.setUpdateById(investors[1].id, {
        $addToSet: { ownedProps: p.id }
      })
    )
  );
  console.log("Updated Investor Two");
}

(async function seed() {
  await startDB();
  await Promise.all([seedAdmin(), seedInvestors()]);
  await seedProperties();
  await updateOwners();
  await stopDB();
})();

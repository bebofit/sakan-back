import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import adminsRepo from "./api/Admin/AdminRepository";
import investorRepo from "./api/Investor/InvestorRepository";
import propertiesRepo from "./api/Property/PropertyRepository";
import { startDB, stopDB } from "./database";
import { UserType, PropType } from "./enums";
import {
  IInvestor,
  IProperty,
  IClient,
  IRentBuyRequest,
  IAddPropertyRequest,
  IContract,
  Contract,
  RentBuyRequest,
  IChat
} from "./database/models";
import faker from "./lib/faker";
import AddPropertyRequestRepository from "./api/Request/AddPropertyRequest/AddPropertyRequestRepository";
import RentBuyRequestRepository from "./api/Request/RentBuyRequest/RentBuyRequestRepository";
import ClientRepository from "./api/Client/ClientRepository";

let investors: IInvestor[];
let clients: IClient[];
let properties: IProperty[] = [];
let investorOneProperties: IProperty[];
let investorTwoProperties: IProperty[];
let investorThreeProperties: IProperty[];
let investorFourProperties: IProperty[];
let rentRequests: IRentBuyRequest[];
let buyRequest: IRentBuyRequest[];
let addPropertyRequests: IAddPropertyRequest[];
let contracts: IContract[];

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
      phoneNumber: "123456781",
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
    }),
    investorRepo.create({
      password,
      userType: UserType.Investor,
      firstName: "Investor",
      lastName: "three",
      email: "investorthree@sakan.me",
      phoneNumber: "123456789",
      gender: "male",
      isVerified: true
    }),
    investorRepo.create({
      password,
      userType: UserType.Investor,
      firstName: "Investor",
      lastName: "Four",
      email: "investorfour@sakan.me",
      phoneNumber: "123456782",
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
    buyValue: faker.random.number(10000000),
    isApproved: true
  });
}

async function seedProperties() {
  investorOneProperties = await Promise.all(
    Array(5)
      .fill(null)
      .map(() => seedProperty(investors[0].id))
  );
  properties = properties.concat(investorOneProperties);
  investorTwoProperties = await Promise.all(
    Array(5)
      .fill(null)
      .map(() => seedProperty(investors[1].id))
  );
  properties = properties.concat(investorTwoProperties);
  investorThreeProperties = await Promise.all(
    Array(5)
      .fill(null)
      .map(() => seedProperty(investors[2].id))
  );
  properties = properties.concat(investorThreeProperties);
  investorFourProperties = await Promise.all(
    Array(5)
      .fill(null)
      .map(() => seedProperty(investors[3].id))
  );
  properties = properties.concat(investorFourProperties);
  console.log("Seeded Properties");
}

async function updateOwners(): Promise<void> {
  // To-do mesh rady ye addToSet ??
  await Promise.all(
    investorOneProperties.map(p =>
      investorRepo.flexibleUpdateById(investors[0].id, {
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
  await Promise.all(
    investorThreeProperties.map(p =>
      investorRepo.setUpdateById(investors[2].id, {
        $addToSet: { ownedProps: p.id }
      })
    )
  );
  console.log("Updated Investor One");
  await Promise.all(
    investorFourProperties.map(p =>
      investorRepo.setUpdateById(investors[3].id, {
        $addToSet: { ownedProps: p.id }
      })
    )
  );
  console.log("Updated Investor Two");
}

async function seedClients(): Promise<void> {
  const password = await bcrypt.hash("123123123", 10);
  clients = await Promise.all([
    ClientRepository.create({
      password,
      wallet: {
        value: 998,
        currency: "EGP"
      },
      userType: UserType.Client,
      firstName: "client",
      lastName: "One",
      email: "clientone@sakan.me",
      phoneNumber: "123456756",
      gender: "male",
      isVerified: true
    }),
    ClientRepository.create({
      password,
      wallet: {
        value: 13123,
        currency: "EGP"
      },
      userType: UserType.Client,
      firstName: "client",
      lastName: "Two",
      email: "clienttwo@sakan.me",
      phoneNumber: "123456745",
      gender: "male",
      isVerified: true
    }),
    ClientRepository.create({
      password,
      wallet: {
        value: 10008899,
        currency: "EGP"
      },
      userType: UserType.Client,
      firstName: "client",
      lastName: "Three",
      email: "clientthree@sakan.me",
      phoneNumber: "1234567445",
      gender: "male",
      isVerified: true
    }),
    ClientRepository.create({
      password,
      wallet: {
        value: 100000000,
        currency: "EGP"
      },
      userType: UserType.Client,
      firstName: "client",
      lastName: "Four",
      email: "clientfour@sakan.me",
      phoneNumber: "1234567491",
      gender: "male",
      isVerified: true
    })
  ]);
  console.log("seeded Clients");
}

async function seedAddPropertyRequest(owner: string): Promise<any> {
  return AddPropertyRequestRepository.create({
    owner,
    propType: faker.helpers.randomize(Object.values(PropType)),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      country: "Egypt"
    },
    description: faker.lorem.paragraph(),
    bedroomNum: faker.random.number(10),
    bathroomNum: faker.random.number(10),
    unitArea: faker.random.number(3000),
    rentValue: faker.random.number(10000),
    buyValue: faker.random.number(10000000),
    isApproved: false,
    status: "pending approval"
  });
}

async function seedAddRequests() {
  addPropertyRequests = await Promise.all(
    Array(4)
      .fill(null)
      .map((value, index) => seedAddPropertyRequest(investors[index].id))
  );
  console.log("Seeded Add Property Requests");
}

async function invoices(property: IProperty) {
  // let startingDate = new Date(faker.date.future());
  let paidInvoices = Array(faker.random.number(10))
    .fill(null)
    .map((value, index) => {
      return {
        invoiceNumber: index + 1,
        // dueDate: startingDate.setMonth(startingDate.getMonth() + index).toString(),
        dueDate: faker.date.future(),
        isPaid: true,
        value: property.rentValue,
        penaltyValue: 0
      };
    });
  paidInvoices.push({
    invoiceNumber: paidInvoices.length + 1,
    dueDate: faker.date.future(),
    isPaid: true,
    value: property.rentValue,
    penaltyValue: 0
  });
  return paidInvoices;
}

async function seedContract(
  property: IProperty,
  client: IClient
): Promise<any> {
  let contractInvoices = await invoices(property);
  return Contract.create({
    contractType: "rent",
    status: "active",
    propertyId: property.id,
    ownerId: property.owner,
    clientId: client.id,
    contractInvoices
  });
}

async function seedContracts(): Promise<any> {
  await Promise.all(
    Array(4)
      .fill(null)
      .map((value, index) => seedContract(properties[index], clients[index]))
  );
  console.log("Seeded Contracts");
}

async function seedRentRequest(
  clientId: string,
  property: IProperty
): Promise<any> {
  return RentBuyRequestRepository.create({
    reqType: "rent",
    ownerId: property.owner,
    clientId: clientId,
    propertyId: property.id,
    isApproved: false,
    status: "pending approval"
  });
}

async function seedRentRequests() {
  rentRequests = await Promise.all(
    Array(4)
      .fill(null)
      .map((value, index) =>
        seedRentRequest(clients[index].id, properties[index])
      )
  );
  console.log("Seeded Rent Requests");
}

// async function seedMessage(senderId: string, receiverId: string) :Promise<any> {
//   return MessageRepository.create({
//     content: faker.lorem.paragraph(),
//     sender: senderId,
//     receiver: receiverId,
//   });
// }

// async function seedMessages(){
//   await Promise.all(
//   Array(faker.random.number({min:1000, max:2000}))
//   .fill(null)
//   .map(() => seedMessage(clients[faker.random.number({min:0, max:3})].id, clients[faker.random.number({min:0, max:3})].id))
//   );
//   console.log('Seeded Messages');
// }

(async function seed() {
  try {
    await startDB();
    await Promise.all([seedAdmin(), seedInvestors()]);
    await seedProperties();
    await updateOwners();
    await seedClients();
    await seedAddRequests();
    await seedContracts();
    await seedRentRequests();
    // await seedMessages();
    await stopDB();
  } catch (error) {
    console.log(error);
  }
})();

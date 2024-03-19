class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected tenants: Person[] = [];
  constructor(protected key: Key) {
    this.door = false;
  }

  public comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(protected key: Key) {
    super(key);
  }
  public openDoor(key: Key) {
    const houseDoorKey = this.key.getSignature();
    const personKey = key.getSignature();
    if (houseDoorKey === personKey) {
      this.door = true;
    } else {
      console.log("Wrong key!");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};

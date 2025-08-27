import { ok, strictEqual } from "node:assert/strict";
import { test } from "node:test";

interface Zombie {
  name: string;
}

const createRoom = (capacity: number) => {
  const _capacity = capacity;
  let _zombies: Zombie[] = [];

  function replaceOldest(zombie: Zombie) {
    _zombies.shift();
    _zombies.push(zombie);
  }

  return {
    isFull: () => _zombies.length >= _capacity,
    addZombie: (zombie: Zombie) => {
      if (_capacity == 0) {
        return false;
      }

      _zombies.length < _capacity ? _zombies.push(zombie) : replaceOldest(zombie);

      return true;
    },
    getZombies: () => _zombies,
  };
};

function createZombies(amount: number): Zombie[] {
  const zombies: Zombie[] = [
    { name: "Kalle" },
    { name: "Stefan" },
    { name: "Gudrun" },
    { name: "Kristina" },
    { name: "Sven" },
    { name: "Harald" },
    { name: "Stig" },
    { name: "Helena" },
  ];

  return zombies.slice(0, amount);
}

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("empty room that fits one zombie is not full", () => {
  const room = createRoom(1);

  const isRoomFull = room.isFull();

  strictEqual(isRoomFull, false);
});

test("room with no capacity cannot fit any zombies", () => {
  const room = createRoom(0);
  const zombies: Zombie[] = createZombies(1);

  const zombieAdded = room.addZombie(zombies[0]);
  const isRoomFull = room.isFull();

  strictEqual(zombieAdded, false);
  strictEqual(isRoomFull, true);
});

test("one-roomer becomes full when a zombie is added", () => {
  const room = createRoom(1);
  const zombies: Zombie[] = createZombies(1);

  const zombieAdded = room.addZombie(zombies[0]);
  const isRoomFull = room.isFull();

  strictEqual(zombieAdded, true);
  strictEqual(isRoomFull, true);
});

test("two-roomer is not full when a zombie is added", () => {
  const room = createRoom(2);
  const zombies: Zombie[] = createZombies(1);

  const zombieAdded = room.addZombie(zombies[0]);
  const isRoomFull = room.isFull();

  strictEqual(zombieAdded, true);
  strictEqual(isRoomFull, false);
});

test("second zombie consumes first zombie when added to a one-roomer", () => {
  const room = createRoom(1);
  const zombies: Zombie[] = createZombies(2);

  for (let i = 0; i < zombies.length; i++) {
    let currentZombie = zombies[i];
    let zombieAdded = room.addZombie(currentZombie);
    let isRoomFull = room.isFull();
    let zombiesInRoom: Zombie[] = room.getZombies();

    strictEqual(zombieAdded, true);
    strictEqual(isRoomFull, true);
    strictEqual(zombiesInRoom[0].name, currentZombie.name);
  }
});

test("oldest zombie is consumed when a new zombie enters a full room", () => {
  const roomSize: number = 4;
  const zombies: Zombie[] = createZombies(8);
  const room = createRoom(roomSize);

  for (let i = 0; i < zombies.length; i++) {
    let currentZombie = zombies[i];
    let zombieAdded = room.addZombie(currentZombie);

    strictEqual(zombieAdded, true);

    if (room.isFull()) {
      let oldestZombieIndex = i - (roomSize - 1);
      let zombiesInRoom: Zombie[] = room.getZombies();

      strictEqual(zombiesInRoom[0].name, zombies[oldestZombieIndex].name);
    }
  }
});

// You are free to add more tests that you think are relevant!

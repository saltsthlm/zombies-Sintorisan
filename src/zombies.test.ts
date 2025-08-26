import { ok, strictEqual } from "node:assert/strict";
import { test } from "node:test";

interface Zombie {
  name: string;
}

const createRoom = (capacity: number) => {
  const _capacity = capacity;
  let zombies: Zombie[] = [];

  return {
    isFull: () => zombies.length >= _capacity,
    addZombie: (zombie: Zombie) => {
      zombies.length < _capacity ? zombies.push(zombie) : (zombies[0] = zombie);
    },
  };
};

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("empty room that fits one zombie is not full", () => {
  const room = createRoom(2);
  const zombie: Zombie = { name: "Kalle" };

  room.addZombie(zombie);
  const isRoomFull = room.isFull();

  strictEqual(isRoomFull, false);
});

test.skip("room with no capacity cannot fit any zombies", () => {});

test.skip("one-roomer becomes full when a zombie is added", () => {});

test.skip("two-roomer is not full when a zombie is added", () => {});

test.skip("second zombie consumes first zombie when added to a one-roomer", () => {});

// You are free to add more tests that you think are relevant!

import { LinkedList } from "./LinkedList.js";

describe("LinkedList", () => {

    // Helper to build a list quickly from an array of values
    function buildList(...values) {
        const list = new LinkedList();
        values.forEach(v => list.append(v));
        return list;
    }

    // ─── append ───────────────────────────────────────────────────────────────

    describe("append(value)", () => {
        test("appends to an empty list — head should hold the value", () => {
            const list = new LinkedList();
            list.append(1);
            expect(list.Head()).toBe(1);
        });

        test("appends multiple values — tail should always be the last appended", () => {
            const list = buildList(1, 2, 3);
            expect(list.tail()).toBe(3);
        });

        test("appends multiple values — size grows correctly", () => {
            const list = buildList(10, 20, 30);
            expect(list.size()).toBe(3);
        });
    });

    // ─── prepend ──────────────────────────────────────────────────────────────

    describe("prepend(value)", () => {
        test("prepends to an empty list — head should hold the value", () => {
            const list = new LinkedList();
            list.prepend(5);
            expect(list.Head()).toBe(5);
        });

        test("prepends to a non-empty list — new value becomes the head", () => {
            const list = buildList(2, 3);
            list.prepend(1);
            expect(list.Head()).toBe(1);
        });

        test("prepends to a non-empty list — old head is not lost, it becomes index 1", () => {
            const list = buildList(2, 3);
            list.prepend(1);
            // After prepend(1): 1 --> 2 --> 3
            expect(list.at(1)).toBe(2);
        });

        test("prepends to a non-empty list — size grows correctly", () => {
            const list = buildList(2, 3);
            list.prepend(1);
            expect(list.size()).toBe(3);
        });
    });

    // ─── size ─────────────────────────────────────────────────────────────────

    describe("size()", () => {
        test("returns 0 for an empty list", () => {
            const list = new LinkedList();
            expect(list.size()).toBe(0);
        });

        test("returns correct size after appending", () => {
            const list = buildList(1, 2, 3, 4, 5);
            expect(list.size()).toBe(5);
        });

        test("returns correct size after popping", () => {
            const list = buildList(1, 2, 3);
            list.pop();
            expect(list.size()).toBe(2);
        });
    });

    // ─── Head ─────────────────────────────────────────────────────────────────

    describe("Head()", () => {
        test("returns undefined for an empty list", () => {
            const list = new LinkedList();
            expect(list.Head()).toBeUndefined();
        });

        test("returns the value of the head node", () => {
            const list = buildList(42, 99);
            expect(list.Head()).toBe(42);
        });

        test("updates after prepend — new head is reflected", () => {
            const list = buildList(2, 3);
            list.prepend(1);
            expect(list.Head()).toBe(1);
        });

        test("updates after pop — next node becomes the head", () => {
            const list = buildList(1, 2, 3);
            list.pop();
            expect(list.Head()).toBe(2);
        });
    });

    // ─── tail ─────────────────────────────────────────────────────────────────

    describe("tail()", () => {
        test("returns undefined for an empty list", () => {
            const list = new LinkedList();
            expect(list.tail()).toBeUndefined();
        });

        test("returns the value of the last node", () => {
            const list = buildList(1, 2, 3);
            expect(list.tail()).toBe(3);
        });

        test("single-node list — head and tail are the same value", () => {
            const list = buildList(7);
            expect(list.tail()).toBe(list.Head());
        });
    });

    // ─── at ───────────────────────────────────────────────────────────────────

    describe("at(index)", () => {
        test("returns the value at index 0 — which is head", () => {
            const list = buildList(10, 20, 30);
            expect(list.at(0)).toBe(10);
        });

        test("returns the value at a middle index", () => {
            const list = buildList(10, 20, 30);
            expect(list.at(1)).toBe(20);
        });

        test("returns the value at the last index", () => {
            const list = buildList(10, 20, 30);
            expect(list.at(2)).toBe(30);
        });

        test("returns undefined for an out-of-bounds index", () => {
            const list = buildList(10, 20, 30);
            expect(list.at(99)).toBeUndefined();
        });

        test("returns undefined for a negative index", () => {
            const list = buildList(10, 20);
            expect(list.at(-1)).toBeUndefined();
        });
    });

    // ─── pop ──────────────────────────────────────────────────────────────────

    describe("pop()", () => {
        test("returns undefined on an empty list", () => {
            const list = new LinkedList();
            expect(list.pop()).toBeUndefined();
        });

        test("returns the head value when popped", () => {
            const list = buildList(1, 2, 3);
            expect(list.pop()).toBe(1);
        });

        test("removes the head — next node becomes the new head", () => {
            const list = buildList(1, 2, 3);
            list.pop();
            expect(list.Head()).toBe(2);
        });

        test("popping the only node leaves an empty list", () => {
            const list = buildList(42);
            list.pop();
            expect(list.size()).toBe(0);
            expect(list.Head()).toBeUndefined();
        });
    });

    // ─── contains ─────────────────────────────────────────────────────────────

    describe("contains(value)", () => {
        test("returns false for an empty list", () => {
            const list = new LinkedList();
            expect(list.contains(1)).toBe(false);
        });

        test("returns true when value exists in the list", () => {
            const list = buildList(1, 2, 3);
            expect(list.contains(2)).toBe(true);
        });

        test("returns true when value is the head", () => {
            const list = buildList(1, 2, 3);
            expect(list.contains(1)).toBe(true);
        });

        test("returns true when value is the tail", () => {
            const list = buildList(1, 2, 3);
            expect(list.contains(3)).toBe(true);
        });

        test("returns false when value does not exist", () => {
            const list = buildList(1, 2, 3);
            expect(list.contains(99)).toBe(false);
        });
    });

    // ─── findIndex ────────────────────────────────────────────────────────────

    describe("findIndex(value)", () => {
        test("returns -1 for an empty list", () => {
            const list = new LinkedList();
            expect(list.findIndex(1)).toBe(-1);
        });

        test("returns 0 when value is the head", () => {
            const list = buildList(10, 20, 30);
            expect(list.findIndex(10)).toBe(0);
        });

        test("returns correct index for a middle value", () => {
            const list = buildList(10, 20, 30);
            expect(list.findIndex(20)).toBe(1);
        });

        test("returns correct index for the tail value", () => {
            const list = buildList(10, 20, 30);
            expect(list.findIndex(30)).toBe(2);
        });

        test("returns -1 when value does not exist", () => {
            const list = buildList(10, 20, 30);
            expect(list.findIndex(99)).toBe(-1);
        });
    });

    // ─── toString ─────────────────────────────────────────────────────────────

    describe("toString()", () => {
        test("returns the correct string for a single node", () => {
            const list = buildList(1);
            // Expected: ( 1 ) --> ( null )
            expect(list.toString()).toBe("( 1 ) --> ( null )");
        });

        test("returns the correct string for multiple nodes", () => {
            const list = buildList(1, 2, 3);
            // Expected: ( 1 ) --> ( 2 ) --> ( 3 ) --> ( null )
            expect(list.toString()).toBe("( 1 ) --> ( 2 ) --> ( 3 ) --> ( null )");
        });

        test("returns correct string after prepend", () => {
            const list = buildList(2, 3);
            list.prepend(1);
            expect(list.toString()).toBe("( 1 ) --> ( 2 ) --> ( 3 ) --> ( null )");
        });

        test("returns correct string after pop removes the head", () => {
            const list = buildList(1, 2, 3);
            list.pop();
            expect(list.toString()).toBe("( 2 ) --> ( 3 ) --> ( null )");
        });
    });

});
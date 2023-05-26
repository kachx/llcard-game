// The rounds are randomized, but curated
// Setting localStorage.llalbum-day-offset = 1 means you will get the next day's round, which allows me to play a day
// ahead, and to check whether it's a good round. If not, it can be rerolled by adding the day to this set
export const rerollDays: { [day: number]: number } = {
    11: 6,
    14: 6,
    15: 3,
    21: 2,
    26: 1,
    28: 8,
    34: 1,
    35: 6,
    39: 4,
    40: 1,
    41: 1,
    43: 2,
    44: 2,
    45: 2,
    46: 1,
    53: 9,
    54: 21,
    55: 6,
    57: 3,
    61: 2,
    62: 3,
    65: 1,
    67: 3,
    68: 4,
    70: 1,
    76: 15,
    78: 1,
    80: 2,
    82: 5,
    83: 2,
    88: 6,
    89: 20,
    90: 2,
    97: 6,
    99: 10,
    101: 4,
    103: 3,
    104: 1,
    109: 15,
    111: 15,
    112: 11,
    115: 1,
    117: 3,
    120: 12,
    121: 21,
    122: 21,
    123: 5,
    126: 1,
    128: 2,
    129: 2,
    131: 3,
    132: 3,
    134: 1,
    136: 11,
    140: 8,
    145: 18,
    146: 12,
    151: 21,
    152: 5,
    153: 13,
    154: 80,
    155: 6,
    156: 9,
    157: 35,
    158: 7,
    159: 8,
    160: 15,
    161: 22,
    162: 10,
    163: 29,
    167: 2,
    168: 5,
    169: 12,
    171: 2,
    172: 45,
    173: 3,
    175: 17,
    176: 5,
    180: 7,
    184: 1,
    185: 20,
    187: 17,
    188: 11,
    190: 22,
    195: 12,
    196: 18,
    197: 20,
    199: 2,
    200: 8,
    201: 4,
    202: 2,
    204: 4
}
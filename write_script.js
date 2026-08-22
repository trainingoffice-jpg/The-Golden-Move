const fs = require('fs');

const levels = [
    // DEMO
    {
        id: 0, title: 'Demo — Welcome!', isDemo: true,
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'chair1', name: 'Single Chair', type: 'chair', x: 2, y: 2, width: 1, height: 1, direction: '4way' }
        ]
    },
    // R1: Very Easy (Old L06)
    {
        id: 1, title: 'High Vault Area',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 2, y: 3, width: 1, height: 2, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 3, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p4', name: 'Chair', type: 'chair', x: 2, y: 5, width: 1, height: 1, direction: '4way' }
        ]
    },
    // R2: Easy (Old L10)
    {
        id: 2, title: 'Vault Corridor',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 3, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 5, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'p4', name: 'Counter', type: 'counter-gold', x: 0, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p5', name: 'Diamond Ctr', type: 'chair', x: 2, y: 0, width: 1, height: 1, direction: '4way' },
            { id: 'p6', name: 'Plat Ctr', type: 'counter-platinum', x: 0, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p8', name: 'Billing Ctr', type: 'counter-billing', x: 2, y: 4, width: 1, height: 2, direction: 'vertical' }
        ]
    },
    // R3: Hard (Old L04)
    {
        id: 3, title: 'Roller Showcase',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Vertical Sofa', type: 'sofa', x: 2, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'p2', name: 'Gold Counter', type: 'counter-gold', x: 3, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p3', name: 'Long Sofa', type: 'sofa-long', x: 5, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'p4', name: 'Diamond Ctr', type: 'counter-diamond', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p5', name: 'Silver Ctr', type: 'counter-silver', x: 3, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p6', name: 'Vertical Sofa B', type: 'sofa', x: 1, y: 4, width: 1, height: 2, direction: 'vertical' },
            { id: 'p7', name: 'Roller', type: 'roller-double', x: 2, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p8', name: 'Plat Ctr', type: 'counter-platinum', x: 2, y: 5, width: 2, height: 1, direction: 'horizontal' }
        ]
    },
    // R4: Very Easy (Old L07)
    {
        id: 4, title: 'Platinum Gallery',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 0, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p2', name: 'Chair', type: 'chair', x: 4, y: 1, width: 1, height: 1, direction: '4way' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 2, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p4', name: 'Sofa', type: 'sofa', x: 3, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p5', name: 'Vertical Sofa', type: 'sofa', x: 5, y: 3, width: 1, height: 2, direction: 'vertical' }
        ]
    },
    // R5: Easy (Old L11)
    {
        id: 5, title: 'Showroom Bottleneck',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 2, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 2, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p4', name: 'Chair', type: 'chair', x: 4, y: 1, width: 1, height: 1, direction: '4way' },
            { id: 'p5', name: 'Diamond Ctr', type: 'counter-diamond', x: 5, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p6', name: 'Sofa', type: 'sofa', x: 1, y: 4, width: 3, height: 1, direction: 'horizontal' },
            { id: 'p7', name: 'Plat Ctr', type: 'counter-platinum', x: 4, y: 4, width: 1, height: 2, direction: 'vertical' }
        ]
    },
    // R6: Hard (Old L05)
    {
        id: 6, title: 'Triple Roller Corridor',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 2, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p2', name: 'Silver Ctr', type: 'counter-silver', x: 4, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p3', name: 'Long Sofa', type: 'sofa-long', x: 1, y: 1, width: 3, height: 1, direction: 'horizontal' },
            { id: 'p4', name: 'Vertical Sofa', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p5', name: 'Diamond Ctr', type: 'chair', x: 1, y: 3, width: 1, height: 1, direction: '4way' },
            { id: 'p6', name: 'Chair', type: 'chair', x: 3, y: 2, width: 1, height: 1, direction: '4way' },
            { id: 'p7', name: 'Plat Ctr', type: 'chair', x: 2, y: 3, width: 1, height: 1, direction: '4way' },
            { id: 'p8', name: 'Roller', type: 'roller-double', x: 5, y: 2, width: 1, height: 3, direction: 'vertical' },
            { id: 'p9', name: 'Sofa', type: 'sofa', x: 2, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p10', name: 'Billing Ctr', type: 'counter-billing', x: 3, y: 5, width: 2, height: 1, direction: 'horizontal' }
        ]
    },
    // R7: Very Easy (Old L09)
    {
        id: 7, title: 'Master Showroom Vault',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 2, y: 1, width: 3, height: 1, direction: 'horizontal' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 2, y: 2, width: 1, height: 2, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 4, y: 2, width: 1, height: 3, direction: 'vertical' },
            { id: 'p4', name: 'Chair', type: 'chair', x: 2, y: 4, width: 1, height: 1, direction: '4way' },
            { id: 'p5', name: 'Plat Ctr', type: 'chair', x: 3, y: 4, width: 1, height: 1, direction: '4way' }
        ]
    },
    // R8: Easy (Old L12)
    {
        id: 8, title: 'Diamond Lock',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 2, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p4', name: 'Chair', type: 'chair', x: 5, y: 2, width: 1, height: 1, direction: '4way' },
            { id: 'p5', name: 'Diamond Ctr', type: 'counter-diamond', x: 3, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p6', name: 'Sofa', type: 'sofa', x: 3, y: 4, width: 1, height: 2, direction: 'vertical' },
            { id: 'p7', name: 'Plat Ctr', type: 'counter-platinum', x: 0, y: 4, width: 2, height: 1, direction: 'horizontal' }
        ]
    },
    // R9: Hard (Old L01)
    {
        id: 9, title: 'Showroom Entrance',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 0, y: 0, width: 3, height: 1, direction: 'horizontal' },
            { id: 'p2', name: 'Silver Counter', type: 'counter-silver', x: 3, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p3', name: 'Sofa', type: 'sofa', x: 0, y: 1, width: 3, height: 1, direction: 'horizontal' },
            { id: 'p4', name: 'Vertical Sofa', type: 'sofa', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p5', name: 'Vertical Sofa B', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p6', name: 'Long Sofa', type: 'sofa-long', x: 5, y: 1, width: 1, height: 3, direction: 'vertical' },
            { id: 'p7', name: 'Diamond Ctr', type: 'counter-diamond', x: 0, y: 3, width: 1, height: 3, direction: 'vertical' },
            { id: 'p8', name: 'Plat Ctr', type: 'counter-platinum', x: 1, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p9', name: 'Roller', type: 'roller-double', x: 1, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p10', name: 'Sofa 2', type: 'sofa', x: 1, y: 5, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p11', name: 'Billing Ctr', type: 'counter-billing', x: 3, y: 5, width: 2, height: 1, direction: 'horizontal' }
        ]
    },
    // R10: Very Easy (Old L14 is Easy, but fits the slot)
    {
        id: 10, title: 'Grand Showroom Maze',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Gold Counter', type: 'counter-gold', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p2', name: 'Vertical Sofa', type: 'sofa', x: 4, y: 2, width: 1, height: 3, direction: 'vertical' },
            { id: 'p3', name: 'Silver Ctr', type: 'counter-silver', x: 5, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p4', name: 'Chair', type: 'chair', x: 2, y: 3, width: 1, height: 1, direction: '4way' },
            { id: 'p5', name: 'Diamond Ctr', type: 'counter-diamond', x: 0, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p6', name: 'Sofa', type: 'sofa', x: 2, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p7', name: 'Plat Ctr', type: 'counter-platinum', x: 0, y: 5, width: 3, height: 1, direction: 'horizontal' }
        ]
    },
    // R11: Easy (Old L02, quite hard but let's keep it here)
    {
        id: 11, title: 'Diamond Aisle',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'p1', name: 'Chair', type: 'chair', x: 2, y: 0, width: 1, height: 1, direction: '4way' },
            { id: 'p2', name: 'Gold Counter', type: 'counter-gold', x: 3, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p3', name: 'Long Sofa', type: 'sofa-long', x: 5, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'p4', name: 'Silver Ctr', type: 'counter-silver', x: 2, y: 1, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p5', name: 'Vertical Sofa', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'p6', name: 'Small Ctr', type: 'chair', x: 2, y: 2, width: 1, height: 1, direction: '4way' },
            { id: 'p7', name: 'Small Ctr 2', type: 'chair', x: 3, y: 2, width: 1, height: 1, direction: '4way' },
            { id: 'p8', name: 'Billing Ctr', type: 'counter-billing', x: 0, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p9', name: 'Roller', type: 'counter-silver', x: 4, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p10', name: 'Sofa', type: 'sofa', x: 0, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p11', name: 'Sofa 2', type: 'sofa', x: 3, y: 5, width: 2, height: 1, direction: 'horizontal' },
            { id: 'p12', name: 'Diamond Ctr', type: 'counter-diamond', x: 2, y: 4, width: 1, height: 2, direction: 'vertical' }
        ]
    },
    // R12: Very Hard (Image 2)
    {
        id: 12, title: 'Lounge Chaos',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'i2_1', type: 'counter-diamond', x: 1, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'i2_2', type: 'counter-gold', x: 2, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i2_3', type: 'sofa', x: 4, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i2_4', type: 'sofa', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i2_5', type: 'counter-silver', x: 4, y: 1, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i2_6', type: 'sofa-long', x: 4, y: 2, width: 1, height: 3, direction: 'vertical' },
            { id: 'i2_7', type: 'sofa', x: 5, y: 2, width: 1, height: 2, direction: 'vertical' },
            { id: 'i2_8', type: 'counter-diamond', x: 0, y: 3, width: 1, height: 3, direction: 'vertical' },
            { id: 'i2_9', type: 'sofa-long', x: 1, y: 3, width: 3, height: 1, direction: 'horizontal' },
            { id: 'i2_10', type: 'sofa', x: 2, y: 4, width: 1, height: 2, direction: 'vertical' },
            { id: 'i2_11', type: 'counter-silver', x: 5, y: 4, width: 1, height: 2, direction: 'vertical' }
        ]
    },
    // R13: Very Hard (Image 3)
    {
        id: 13, title: 'Instrument Storage',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'i3_1', type: 'sofa', x: 0, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_2', type: 'sofa', x: 1, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_3', type: 'counter-silver', x: 2, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_4', type: 'counter-gold', x: 3, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i3_5', type: 'counter-diamond', x: 5, y: 0, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_6', type: 'sofa', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_7', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_8', type: 'sofa-long', x: 5, y: 2, width: 1, height: 3, direction: 'vertical' },
            { id: 'i3_9', type: 'counter-silver', x: 2, y: 3, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_10', type: 'counter-diamond', x: 4, y: 3, width: 1, height: 2, direction: 'vertical' },
            { id: 'i3_11', type: 'counter-gold', x: 1, y: 5, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i3_12', type: 'sofa-long', x: 3, y: 5, width: 3, height: 1, direction: 'horizontal' }
        ]
    },
    // R14: Very Hard (Image 4)
    {
        id: 14, title: 'Game Room',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'i4_1', type: 'chair', x: 2, y: 0, width: 1, height: 1, direction: '4way' },
            { id: 'i4_2', type: 'counter-gold', x: 3, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_3', type: 'sofa-long', x: 5, y: 0, width: 1, height: 3, direction: 'vertical' },
            { id: 'i4_4', type: 'counter-gold', x: 2, y: 1, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_5', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i4_6', type: 'counter-silver', x: 2, y: 2, width: 1, height: 2, direction: 'vertical' },
            { id: 'i4_7', type: 'sofa', x: 3, y: 2, width: 1, height: 2, direction: 'vertical' },
            { id: 'i4_8', type: 'counter-gold', x: 0, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_9', type: 'counter-silver', x: 4, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_10', type: 'counter-gold', x: 0, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_11', type: 'sofa', x: 2, y: 4, width: 1, height: 2, direction: 'vertical' },
            { id: 'i4_12', type: 'sofa-long', x: 3, y: 4, width: 3, height: 1, direction: 'horizontal' },
            { id: 'i4_13', type: 'counter-gold', x: 0, y: 5, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i4_14', type: 'sofa-long', x: 3, y: 5, width: 3, height: 1, direction: 'horizontal' }
        ]
    },
    // R15: Very Hard (Image 5)
    {
        id: 15, title: 'The Ultimate Block',
        player: { id: 'player', name: 'Jewellery Staff', x: 0, y: 2, width: 2, height: 1, direction: 'horizontal' },
        exit: { x: 5, y: 2 },
        pieces: [
            { id: 'i5_1', type: 'counter-gold', x: 2, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i5_2', type: 'sofa', x: 4, y: 0, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i5_3', type: 'sofa', x: 2, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i5_4', type: 'sofa', x: 3, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i5_5', type: 'sofa', x: 4, y: 1, width: 1, height: 2, direction: 'vertical' },
            { id: 'i5_6', type: 'sofa-long', x: 5, y: 1, width: 1, height: 3, direction: 'vertical' },
            { id: 'i5_7', type: 'counter-gold', x: 0, y: 3, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i5_8', type: 'sofa-long', x: 2, y: 3, width: 3, height: 1, direction: 'horizontal' },
            { id: 'i5_9', type: 'sofa-long', x: 0, y: 4, width: 3, height: 1, direction: 'horizontal' },
            { id: 'i5_10', type: 'sofa', x: 3, y: 4, width: 2, height: 1, direction: 'horizontal' },
            { id: 'i5_11', type: 'chair', x: 5, y: 4, width: 1, height: 1, direction: '4way' }
        ]
    }
];

fs.writeFileSync('d:/moveit/script.js', 'const levels = ' + JSON.stringify(levels, null, 4) + ';\n');

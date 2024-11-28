import confetti from 'canvas-confetti';

const scalar = 5;
const successShape = confetti.shapeFromText({ text: '✅', scalar });
const errorShape = confetti.shapeFromText({ text: '❌', scalar });

const defaults = {
    ticks: 120,
    gravity: 0,
    decay: 0.93,
    startVelocity: 10,
    scalar,
};

export const throwSuccessConfetti = (
    emoji: string,
    x: number = 0.5,
    y: number = 0.5
) => {
    const flagShape = confetti.shapeFromText({ text: emoji, scalar });

    const successDefaults = {
        ...defaults,
        spread: 360,
        shapes: [successShape, flagShape],
        origin: { x, y },
    };

    confetti({
        ...successDefaults,
        particleCount: 15,
    });

    confetti({
        ...successDefaults,
        particleCount: 30,
        scalar: scalar / 2,
        shapes: ['circle', 'circle'],
    });
};

export const throwErrorConfetti = (x: number = 0.5, y: number = 0.5) => {
    const errorDefaults = {
        ...defaults,
        spread: 180,
        angle: 90,
        gravity: 1.5,
        decay: 0.9,
        shapes: [errorShape],
        origin: { x, y },
    };

    confetti({
        ...errorDefaults,
        particleCount: 30,
    });
};

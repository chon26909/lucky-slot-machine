'use client';
import React, { useRef } from 'react';
import './Slot.scss';

const imageSlot = 'https://assets.codepen.io/439000/slotreel.webp';

const Slot = () => {
    const ref1 = useRef([]);

    const iconWidth = 79;
    const iconHeight = 79;
    const numIcons = 9;
    const timePerIcon = 108;
    const reels = [...Array(6)];
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const roll = (index: number) => {
        const reelElement = itemsRef.current[index];
        const reelElementStyle = getComputedStyle(reelElement);
        const backgroundPositionY = parseFloat(reelElementStyle.backgroundPositionY);

        const delta = (1 + 2) * numIcons + Math.round(Math.random() * numIcons);

        console.log('backgroundPositionY', backgroundPositionY);

        return new Promise<void>((resolve, reject) => {
            reelElement.style.transition = `background-position-y ${
                8 + delta * timePerIcon
            }ms cubic-bezier(0.45, 0.05, 0.58, 1.09)`;

            reelElement.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;

            setTimeout(() => {
                resolve();
            }, 8 + delta * timePerIcon);
        });
    };

    return (
        <div className='slot-page'>
            <div className='slots'>
                {reels.map((r, i) => {
                    return (
                        <div
                            className='reel'
                            key={i}
                            id={'reel-' + i}
                            ref={(el: any) => {
                                itemsRef.current[i] = el;
                                return el;
                            }}
                        ></div>
                    );
                })}
            </div>
            <div className='w-[550px] flex justify-evenly'>
                {reels.map((r, i) => {
                    return (
                        <button key={i} className='p-5 bg-slate-400' onClick={() => roll(i)}>
                            spin {i + 1}
                        </button>
                    );
                })}
            </div>
            <img className='fixed left-0 top-0 h-screen w-auto' src={imageSlot} alt='bg' />
        </div>
    );
};

export default Slot;

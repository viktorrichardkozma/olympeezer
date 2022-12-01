import { useState, MouseEvent, PointerEvent } from 'react';
import { setSeek } from '@redux/playerSlice'
import { useAppSelector } from '@hooks/redux';

import TimeFormatter from '@utils/timeFormatter'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useElementSize } from 'usehooks-ts'

const PlayingProgressbar = () => {

    //TO HAVE SMOOTH ANIMATION REQUEST ANIMATION FRAME COULD BE USED

    const dispatch = useDispatch();
    const [seekPos, setSeekPos] = useState<number>(0);

    const [progressBarRef, { width : progressBarWidth }] = useElementSize()

    const { duration, elapsed } = useAppSelector((state) => state.player.currentSongMetaData);

    const elapsedTime = TimeFormatter(elapsed);
    const remainingTime = TimeFormatter(duration - elapsed);

    const currentProgressBarPos = duration === 0 ? 0 : ( progressBarWidth / duration ) * elapsed;

    const handleMouseClick = useCallback( (e: MouseEvent<HTMLDivElement>) => {
        const newElapsedTimeWidth = e.clientX - e.currentTarget.offsetLeft;
        const elapsedTime = duration * (newElapsedTimeWidth / progressBarWidth);
        dispatch(setSeek({seek: elapsedTime}))
    }, [dispatch, progressBarWidth, duration])

    const handlePointerMove = useCallback( (e: PointerEvent<HTMLDivElement>) => {
        const newElapsedTimeWidth = e.clientX - e.currentTarget.offsetLeft;
        setSeekPos(newElapsedTimeWidth);
    }, [])

    const handlePointerLeave = useCallback( (e: PointerEvent<HTMLDivElement>) => {
        setSeekPos(0);
    }, [])

    return <div className='flex items-center select-none'>
        <div className='text-xs text-gray-300 group-hover:text-gray-400 text-center px-1'> 
            {elapsedTime}
        </div>
        <div className="w-full py-2 cursor-pointer" ref={progressBarRef} onClick={handleMouseClick} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} >
            <div className="h-1 bg-gray-100 group-hover:bg-gray-200 overflow-hidden relative" >
                <div className="absolute w-full left-0 z-10 h-1 bg-gray-200 group-hover:bg-gray-300" style={{transform: `translateX(${ - progressBarWidth + seekPos}px)`}}/>
                <div className="absolute w-full left-0 z-20 h-1 bg-gray-300 group-hover:bg-gray-400" style={{transform: `translateX(${ - progressBarWidth + currentProgressBarPos}px)`}} />
            </div>
        </div>
        <div className='text-xs text-gray-300 group-hover:text-gray-400 text-center px-1'> 
            {remainingTime}
        </div>
    </div>
   
}

export default PlayingProgressbar;
import { useState, MouseEvent } from 'react';
import { setSeek } from '@redux/playerSlice'
import { useAppSelector } from '@hooks/redux';

import TimeFormatter from '@utils/timeFormatter'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const PlayingProgressbar = () => {

    //TO HAVE SMOOTH ANIMATION REQUEST ANIMATION FRAME COULD BE USED

    const dispatch = useDispatch();

    const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

    const { duration, elapsed } = useAppSelector((state) => state.player.currentSongMetaData);

    const elapsedTime = TimeFormatter(elapsed);
    const remainingTime = TimeFormatter(duration - elapsed);

    const statusPercentage = duration === 0 ? 0 : (elapsed / duration) * 100;

    const handleMouseClick = useCallback( (e: MouseEvent<HTMLDivElement>) => {
        const newElapsedTimeWidth = e.clientX - e.currentTarget.offsetLeft;
        const elapsedTime = duration * (newElapsedTimeWidth / progressBarWidth);
        dispatch(setSeek({seek: elapsedTime}))
    }, [dispatch, progressBarWidth, duration])

    const progressBarRef = useCallback( (node: HTMLDivElement) => {
        if (!node) return;
        const {width} = node.getBoundingClientRect();
        setProgressBarWidth(width);
    },[])

    return <div className='flex items-center select-none'>
        <div className='text-xs text-gray-400 text-center px-1'> 
            {elapsedTime}
        </div>
        <div className="w-full" ref={progressBarRef}>
            <div onClick={handleMouseClick} className="h-1 bg-gray-200 overflow-hidden cursor-pointer relative" >
                <div className="h-1 bg-gray-400 transition-all z-10" style={{transform: `translateX(${-100 + statusPercentage}%)`}} />
            </div>
        </div>
        <div className='text-xs text-gray-400 text-center px-1'> 
            {remainingTime}
        </div>
    </div>
   
}

export default PlayingProgressbar;
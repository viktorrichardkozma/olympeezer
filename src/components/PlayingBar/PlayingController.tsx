import { useRef, useEffect, ChangeEvent, useCallback} from 'react'
import { ControlIcon } from '../factories/Icon'
import { ReactComponent as PlayingIcon } from '@icons/play.svg';
import { ReactComponent as PauseIcon } from '@icons/pause.svg';
import { ReactComponent as ArrowIcon } from '@icons/arrow.svg';

import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { play, pause, next, previous, setDuration, setElapsed } from '@redux/playerSlice'

const PlayingController = () => {

    const dispatch = useAppDispatch()
    
    const audioEl = useRef<HTMLAudioElement | null>(null);

    const songs = useAppSelector((state) => state.player.songs)
    const currentSongIndex = useAppSelector((state) => state.player.currentSongIndex)
    const seek = useAppSelector((state) => state.player.currentSongMetaData.seek)
    const isPlaying = useAppSelector((state) => state.player.isPlaying)
    
    const isPrevDisabled = currentSongIndex - 1 < 0
    const isNextDisabled = currentSongIndex + 1 === songs.length
    
    const { audio: src } = songs[currentSongIndex];

    const handleTimeUpdate = useCallback( (e: ChangeEvent<HTMLMediaElement> ) => {
        const elapsed = e.target.currentTime

        dispatch(setElapsed({
            elapsed
        }))

    },[dispatch])

    const handleEnd = useCallback( () => {
        if(isNextDisabled){
            dispatch(pause())
        } else {
            dispatch(next())
        }
    }, [dispatch, isNextDisabled])

    const handleLoadedMetadata = useCallback( (e: ChangeEvent<HTMLMediaElement> ) => {
        const duration = e.target.duration

        dispatch(setDuration({
            duration
        }))

    },[dispatch])

    useEffect(() => {
        if(audioEl.current)
            if(isPlaying) 
                audioEl.current.play();
            else 
                audioEl.current.pause();
    }, [isPlaying, currentSongIndex]);

    useEffect(() => {
        if(audioEl.current) {
            audioEl.current.currentTime = seek;
        }
    }, [seek]);

   return <div className="flex items-center gap-4">
        <audio
            src={src}
            ref={audioEl}
            onTimeUpdate={(e: ChangeEvent<HTMLMediaElement>) => handleTimeUpdate(e)}
            onEnded={handleEnd}
            onLoadedMetadata={handleLoadedMetadata}
        ></audio>
        <div>
            <ControlIcon
                data-testid="previous"
                disabled={isPrevDisabled} size="md" label="Previous" className={'rotate-180'} onClick={ () => dispatch(previous()) }>
                <ArrowIcon/>
            </ControlIcon>
        </div>
        <div data-testid="play">
            <ControlIcon size="lg"
                label={ isPlaying ? "Pause" : "Play" }
                onClick={ () => isPlaying ? dispatch(pause()) : dispatch(play()) }
            >
            { isPlaying ? <PauseIcon/> :  <PlayingIcon/> }
        </ControlIcon>
        </div>
        <ControlIcon data-testid="next" disabled={isNextDisabled} size="md" label="Next" onClick={ () => dispatch(next()) }>
            <ArrowIcon/>
        </ControlIcon>
    </div>
}

export default PlayingController;

import AlbumCover from "@components/factories/AlbumCover";
import { Song } from "@entityTypes/song";
import { ReactComponent as VolumeIcon } from '@icons/volume.svg';
import { SimpleIcon } from '@factories/Icon'
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { select } from '@redux/playerSlice'

const SongCard = ({cover, name, artist, id, isCurrent, displayedIndex} : Pick<Song, 'cover' | 'name' | 'artist' | 'id' > & {displayedIndex: number, isCurrent: boolean} ) => {
    const dispatch = useAppDispatch()
    const isPlaying = useAppSelector((state) => state.player.isPlaying)
    const originalIndex = displayedIndex - 1;

    return <div className="flex py-2 items-center hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer select-none relative group"
                onClick = {() => dispatch(select(originalIndex))}
    >
                <div className="text-center text-xs text-gray-400 min-w-[24px] group-hover:text-gray-600">
                    {displayedIndex}
                </div>
                <div className="min-w-[56px]">
                    <AlbumCover size="sm" src={cover} alt={name} rounded />
                </div>
                <div className="grid grid-cols-1 grid-rows-2 ml-4">
                    <p className="text-gray-800 font-bold truncate text-sm">{name}</p>
                    <p className="text-gray-600 truncate text-sm">{artist}</p>
                </div>
                {   
                    (isCurrent && isPlaying) && <div data-testid="playing" className="right-4 absolute w-4">
                        <SimpleIcon size="sm" animation="pulse">
                            <VolumeIcon/>
                        </SimpleIcon>
                    </div>
                }
            </div>
}

export default SongCard;
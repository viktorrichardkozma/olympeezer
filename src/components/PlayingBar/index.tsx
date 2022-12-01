import PlayingController from './PlayingController'
import PlayingProgressbar from './PlayingProgressbar'

const PlayingBar = () => <div className='flex justify-center z-10 items-center h-full border-t border-gray-200 bg-white'>
        <div className='grid grid-rows-2 w-2/3'>
            <PlayingProgressbar/>
            <div className='px-1/3 flex justify-center'>
                <PlayingController/>
            </div>
        </div>
    </div>


export default PlayingBar;
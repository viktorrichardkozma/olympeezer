import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

//Simplebar is for windows to have a common outlook.

interface IList<T> {
    items: T[],
    renderItem: (item: T, index:number) => React.ReactNode,
    dimensions?: {
        height: number
        width?: number
    }
}

const List = <T,>({items, renderItem, dimensions} : IList<T>) => {
    return <SimpleBar style={{ height: dimensions?.height }} >
            <div className='divide-y divide-gray-200'>
                {
                    items.map( (item: T, index: number) => renderItem(item, index))
                }
            </div>
    </SimpleBar>

}

export default List;

import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { MessageHelper } from '../../helpers/MessageHelper';
import { MarkdownIcon } from '../../viewpanel/components/Icons/MarkdownIcon';
import { DashboardMessage } from '../DashboardMessage';
import { Page } from '../models/Page';
import { ViewSelector, ViewType } from '../state';
import { DateField } from './DateField';
import { Status } from './Status';

export interface IItemProps extends Page {}

export const Item: React.FunctionComponent<IItemProps> = ({ fmFilePath, date, title, draft, description, preview }: React.PropsWithChildren<IItemProps>) => {
  const view = useRecoilValue(ViewSelector);

  let className = '';
  if (view === ViewType.Grid) {
    className = `grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8`;
  } else if (view === ViewType.List) {
    className = `divide-y divide-vulcan-200`;
  }
  
  const openFile = () => {
    MessageHelper.sendMessage(DashboardMessage.openFile, fmFilePath);
  };

  if (view === ViewType.Grid) {
    return (
      <li className="relative">
        <button className={`group cursor-pointer flex flex-wrap items-start content-start h-full w-full bg-gray-50 dark:bg-vulcan-200 text-vulcan-500 dark:text-whisper-500 text-left overflow-hidden shadow-md hover:shadow-xl dark:hover:bg-vulcan-100`}
                onClick={openFile}>
          <div className="relative h-36 w-full overflow-hidden border-b border-gray-100 dark:border-vulcan-100 dark:group-hover:border-vulcan-200">
            {
              preview ? (
                <img src={`${preview}`} alt={title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className={`flex items-center justify-center bg-whisper-500 dark:bg-vulcan-200 dark:group-hover:bg-vulcan-100`}>
                  <MarkdownIcon className={`h-32 text-vulcan-100 dark:text-whisper-100`} />
                </div>
              )
            }
          </div>

          <div className="p-4 w-full">
            <div className={`flex justify-between items-center`}>
              <Status draft={!!draft} />

              <DateField value={date} />
            </div>

            <h2 className="mt-2 mb-2 font-bold">{title}</h2>

            <p className="text-xs text-vulcan-200 dark:text-whisper-800">{description}</p>
          </div>
        </button>
      </li>
    );
  } else if (view === ViewType.List) {
    return (
      <li className="relative">
        <button className={`px-5 cursor-pointer w-full text-left grid grid-cols-12 gap-x-4 sm:gap-x-6 xl:gap-x-8 py-2 border-b border-vulcan-50 hover:bg-vulcan-50 hover:bg-opacity-70`} onClick={openFile}>
          <div className="col-span-8 font-bold truncate">
            {title}
          </div>
          <div className="col-span-2">
            <DateField value={date} />
          </div>
          <div className="col-span-2">
            <Status draft={!!draft} />
          </div>
        </button>
      </li>
    );
  }

  return null;
};

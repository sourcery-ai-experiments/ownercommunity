import { describe, it, expect, vi } from 'vitest';
import { render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Download } from './download';
import { Editor } from '@craftjs/core';
import * as LocalData from '../local-data';

describe('Given the download component', async () => {
  //Arrange
  const user = userEvent.setup();
  const clipboardSpy = vi.spyOn(navigator.clipboard, "writeText");  
  const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
  const givenLoadedPageLayouts  = [{id:'123123', parent:'123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'{hello:world}' } as LocalData.LoadedPageLayout] as LocalData.PageLayouts;

  usePageLayoutsSpy.mockReturnValue([
    givenLoadedPageLayouts,
    {} as any,
    {} as any
  ]);

  const {getByText, getByTestId} = render(
    <div data-testid="testHarness">
      <Editor >
        <Download />
      </Editor>
    </div>
  );

  describe('when Get JSON button is clicked', async () => {
    //Act
    await user.click(getByTestId('get-site-json'));
    it('then a message should be shown to the user.',async  () => {
      //Assert
      expect(getByText("The JSON has been copied to your clipboard",{exact:false})).toBeDefined() 
    });
    it('then the clipboard should contain the JSON of the current pageLayout.',async  () => {
      //Assert
      expect(clipboardSpy).toHaveBeenCalledWith(JSON.stringify((givenLoadedPageLayouts as LocalData.LoadedPageLayout[])))
    });
  });
});
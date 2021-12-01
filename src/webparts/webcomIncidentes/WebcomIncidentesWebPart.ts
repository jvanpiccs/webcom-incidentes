import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";

import * as strings from 'WebcomIncidentesWebPartStrings';
import {WebcomIncidentes, IWebcomIncidentesProps} from './components/WebcomIncidentes';

export interface IWebcomIncidentesWebPartProps {
  description: string;
}

export default class WebcomIncidentesWebPart extends BaseClientSideWebPart<IWebcomIncidentesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWebcomIncidentesProps> = React.createElement(
      WebcomIncidentes,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }   

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

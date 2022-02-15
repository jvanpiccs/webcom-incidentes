import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp/presets/all';

import * as strings from 'WebcomIncidentesWebPartStrings';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';

import { IIncidentesAppProps, IncidentesApp } from './components/IncidentesApp';

export interface IWebcomIncidentesWebPartProps {
  description: string;
}

export default class WebcomIncidentesWebPart extends BaseClientSideWebPart<IWebcomIncidentesWebPartProps> {
  public render(): void {
    // const element: React.ReactElement<IWebcomIncidentesProps> = React.createElement(
    //   WebcomIncidentes,
    //   {
    //     description: this.properties.description
    //   }
    // );
    const element: React.ReactElement<IIncidentesAppProps> =
      React.createElement(IncidentesApp, { themeVariant: this._themeVariant });

    ReactDom.render(element, this.domElement);
  }
  //theme
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );
    // spfx
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  //theme
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
} //end class

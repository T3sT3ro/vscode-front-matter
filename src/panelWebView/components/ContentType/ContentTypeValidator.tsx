import { Messenger } from '@estruyf/vscode/dist/client';
import { VSCodeButton, VSCodeDivider } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';
import { useMemo } from 'react';
import { Field } from '../../../models';
import { CommandToCode } from '../../CommandToCode';
import { IMetadata } from '../Metadata';
import { VsLabel } from '../VscodeComponents';
import * as l10n from '@vscode/l10n';
import { LocalizationKey } from '../../../localization';

export interface IContentTypeValidatorProps {
  fields: Field[];
  metadata: IMetadata;
}

const fieldsToIgnore = [`filePath`, `articleDetails`, `slug`, `keywords`, `type`];

export const ContentTypeValidator: React.FunctionComponent<IContentTypeValidatorProps> = ({
  fields,
  metadata
}: React.PropsWithChildren<IContentTypeValidatorProps>) => {
  const isValid = useMemo(() => {
    const metadataFields = Object.keys(metadata).filter((key) => !fieldsToIgnore.includes(key));

    for (const mField of metadataFields) {
      if (!fields.find((field) => field.name === mField)) {
        return false;
      }
    }

    return true;
  }, [fields, metadata]);

  const generateContentType = () => {
    Messenger.send(CommandToCode.generateContentType);
  };

  const addMissingFields = () => {
    Messenger.send(CommandToCode.addMissingFields);
  };

  const setContentType = () => {
    Messenger.send(CommandToCode.setContentType);
  };

  if (isValid) {
    return null;
  }

  return (
    <div className="hint">
      <VsLabel>
        <div className={`metadata_field__label metadata_field__alert`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.56 1h.88l6.54 12.26-.44.74H1.44L1 13.26 7.56 1zM8 2.28L2.28 13H13.7L8 2.28zM8.625 12v-1h-1.25v1h1.25zm-1.25-2V6h1.25v4h-1.25z"
            />
          </svg>

          <span>
            {l10n.t(LocalizationKey.panelContentTypeContentTypeValidatorTitle)}
          </span>
        </div>
      </VsLabel>


      {l10n.t(LocalizationKey.panelContentTypeContentTypeValidatorHint).split(`\n`).map(s => (<p className="inline_hint" key={s}>{s}</p>))}


      <div className="hint__buttons">
        <VSCodeButton style={{ "--border-width": 0 }} appearance={`secondary`} onClick={generateContentType}>
          {l10n.t(LocalizationKey.panelContentTypeContentTypeValidatorButtonCreate)}
        </VSCodeButton>

        <VSCodeButton style={{ "--border-width": 0 }} appearance={`secondary`} onClick={addMissingFields}>
          {l10n.t(LocalizationKey.panelContentTypeContentTypeValidatorButtonAdd)}
        </VSCodeButton>

        <VSCodeButton style={{ "--border-width": 0 }} appearance={`secondary`} onClick={setContentType}>
          {l10n.t(LocalizationKey.panelContentTypeContentTypeValidatorButtonChange)}
        </VSCodeButton>
      </div>

      <VSCodeDivider />
    </div>
  );
};

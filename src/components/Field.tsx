import React from 'react';
import { Form, FieldGroup } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import ReactDropzoneUploader from './ReactDropzoneUploader'

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/

  return (
    <React.Fragment>
      <Form onSubmit={() => console.log('onSubmit')} spacing="default">
        <FieldGroup>
          <ReactDropzoneUploader props={props}/>
        </FieldGroup>
      </Form>
    </React.Fragment>
  );
};

export default Field;

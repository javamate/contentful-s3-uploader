import React, { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import getPresignedUploadParams from '../service/contentService'

const MyUploader = (props) => {
  const [myProps, setMyProps] = useState(props)
  // specify upload params and url for your files
  const getUploadParams = async ({ meta: { name } }) => {
    const res = await getPresignedUploadParams(name)
    const presignedParams = await res.json()
    const { fields, url } = presignedParams.data
    const fileUrl = url + '/' + fields.key
    const filePath = fields.key
    const uploadUrl = url
    return { fields, meta: { fileUrl, filePath }, url: uploadUrl }
  }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      // Here's where you customize the details of the object you want to store in 
      // the Contentful field.
      var fileDetails = {
        filename: meta.name,
        filemime: meta.type,
        filesize: meta.size,
        filepath: meta.filePath,
        url: `${STATIC_CDN_PATH}/${meta.filePath}`, //
        source: 's3'
      }
      myProps.props.sdk.field.setValue(fileDetails)
      setMyProps(myProps)
    }
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept="audio/*" // TODO Make the supported types a configuration option
      submitButtonDisabled={true}
      maxFiles={1} // TODO Make the number of files per field a configuration option
      multiple={false} // Set this to true to enable uploading multiple files, including directories (will require some other changes, see https://react-dropzone-uploader.js.org/docs/examples#!/Custom%20Input,%20Directory%20Drag%20and%20Drop)
      canCancel={false}
      inputWithFilesContent={myProps.props.sdk.field.getValue()?.filename}
      inputContent={ myProps.props.sdk.field.getValue() ? myProps.props.sdk.field.getValue()?.filename + ' Size: ~' +  (Math.trunc(myProps.props.sdk.field.getValue()?.filesize/1024/1024)) + 'Mb' : 'Drop or select an audio file' } 
      submitButtonContent={undefined}
    />
  )
}

export default MyUploader;

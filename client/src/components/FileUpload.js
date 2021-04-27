import React, { useState } from 'react';
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  const onChangeFile = e => {
    setFile(e.target.files[0]);
    if (e.target.files.length !== 0)
      setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData);
      const { fileName, imagesPath } = res.data;
      setUploadedFile({ fileName, imagesPath });
      setMessage('File Uploaded');

    } catch (err) {
      err.response.status === 500 ?
        setMessage('There was a problem with the server') :
        setMessage(err.response.data);
    }
  };

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}

      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChangeFile}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <button
          type='submit'
          className='btn btn-primary btn-block mt-4'>Upload</button>
      </form>

      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.imagesPath} alt='' />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FileUpload;

import React, { useRef } from 'react';
//https://www.npmjs.com/package/@tinymce/tinymce-react
import { Editor } from '@tinymce/tinymce-react';
//https://www.digitalocean.com/community/tutorials/react-axios-react
import axios from 'axios';
import { lipapiUrl } from './utils/url-utils';
import { useAuth0 } from './react-auth0-wrapper';
// import { ALERT_SEVERITY } from './FluidAlert';

export interface EditorProps {
    id: string;
    inline?: boolean;
    placeholder: string;
    height?: string;
    onChange: Function;
    key?: string;
    value?: string;
    onUploadClicked?: Function;
  }
  
  export default function IncEditor(props: EditorProps) {
    const editorRef = useRef<any>(null);
    //const { getTokenSilently } = useAuth0();
  
    function initEditor() {
      let init = {
        menubar: !props.inline,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'searchreplace',
          'quickbars',
          'insertdatetime',
          'table',
          'paste',
          'emoticons',
          'image',
          'autoresize',
        ],
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: false,
        autoresize_bottom_margin: 0,
        min_height: props.inline ? 70 : 300,
        max_height: 500,
        toolbar: '',
        value: '',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder: props.placeholder,
        branding: false,
        statusbar: false,
        content_css: '',
        styles: {
          textAlign: 'right',
        },
        setup: function (editor:any) {
          editor.ui.registry.addButton('fileUploader', {
            icon: 'upload',
            onAction: (e:any) => {
              props.onUploadClicked!();
            },
          });
        },
        paste_block_drop: true,
        relative_urls: false,
        images_upload_handler: async function (blobInfo:any, progress:any) {
          return new Promise(async (resolve, reject) => {
            await axios
              .post(
                `${lipapiUrl()}/documents?key=${blobInfo.filename()}`,
                {},
                {
                  headers: {
                   // Authorization: `Bearer ${await getTokenSilently()}`,
                  },
                }
              )
              .then((response) => {
                let key = response.data.documentKey;
  
                axios
                  .put(`${response.data.putUrl}`, blobInfo.blob(), {
                    headers: {
                      'Content-Type': blobInfo.blob().type,
                    },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                  })
                  .then(async (response) => {
                    resolve(`${lipapiUrl()}/documents/download/${key}`);
                  })
                  .catch((e) => {
                    document.dispatchEvent(
                      new CustomEvent('AddAlert', {
                        detail: {
                          message:
                            'Failed to save image, try again or contact support',
                         // severity: ALERT_SEVERITY.ERROR,
                        },
                      })
                    );
                    console.log(e);
                    reject(e);
                  });
              });
          });
        },
      };
  
      const inlineToolbar =
        'bold italic underline emoticons link image fileUploader codesample';
      const fullToolbar =
        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image';
  
      if (props.inline) init.toolbar = inlineToolbar;
      else init.toolbar = fullToolbar;
  
      return init;
    }
  
    return (
      <>
        <Editor
          key={props.key}
          onInit={(evt, editor) => (editorRef.current = editor)}
          id={props.id}
          // @ts-ignore
          init={initEditor()}
          onEditorChange={(content) => {
            props.onChange(content);
          }}
          value={props.value ? props.value : ''}
        />
      </>
    );
  }
  
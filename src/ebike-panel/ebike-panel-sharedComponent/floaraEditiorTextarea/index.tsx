import React from 'react';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';

const FloaraTextarea = ({ value, onChange }: any) => {

  return (
    <FroalaEditor
      tag="textarea"
      model={value}
      config={{
        placeholderText: "Write description...",
        toolbarButtons: [
          'fullscreen',
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          '|',
          'fontFamily',
          'fontSize',
          'color',
          '|',
          'inlineStyle',
          'paragraphStyle',
          '|',
          'paragraphFormat',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent', '|',
          'quote',
          'insertLink',
          'insertImage',
          'insertVideo',
          'upload',
          'insertTable',
          '|',
          'emoticons',
          'specialCharacters',
          'insertHR',
          '|',
          'selectAll',
          'clearFormatting',
          'print',
          'pdfExport',
          'help',
          'html'
        ],
        heightMin: 200,
      }}
      onModelChange={onChange}
    />
  );
};

export default FloaraTextarea;
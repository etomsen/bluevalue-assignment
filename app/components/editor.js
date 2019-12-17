import Component from '@ember/component';
import computedStyle from 'ember-computed-style';

export default Component.extend({
  style: computedStyle('editorStyle'),

  willDestroyElement() {
    this.summernote.destroy();
    this._super(...arguments);
  },
  
  didInsertElement() {
    const summernote = this.createSummernote();
    this.set('summernote', summernote);
    $(this.summernote).summernote('code', this.text);
  },

  onSummernoteChange() {
    // this is the desired height,
    // but component height is changed automatically by CSS,
    // so we dont need to set it
    const editor = this.element.querySelector('.note-editable');
    const height = editor.scrollHeight;
    this.set('height', `${height}px`);
  },

  createSummernote() {
    // TODO: summernote requires jQuery :(
    const editor = this.element.querySelector('.value-blue-editor');
    return $(editor).summernote({
      placeholder: 'Please insert some text...',
      tabsize: 2,
      callbacks:{
        onChange: this.onSummernoteChange.bind(this)
      }
    });
  }
});

CKEDITOR.dialog.add('btbadgesDialog', function(editor){
	var lang = editor.lang.btbadges;
	return {
		title: lang.title,
		minWidth: 400,
		minHeight: 150,
		contents: [
			{
				id: 'tab-basic',
				label: lang.tabBasic,
				elements: [
					{
						id: 'txt',
						type: 'text',
						required: true,
						label: lang.txtLabel,
						setup: function(element){
							this.setValue(element.getText().trim());
						},
						commit: function(element){
							element.setText(this.getValue() || 'Badge');
						}
					},
					{
						id: 'style',
						type: 'select',
						label: lang.styleLabel,
						items: [
							[lang.primary, 'badge-primary'],
							[lang.secondary, 'badge-secondary'],
							[lang.success, 'badge-success'],
							[lang.danger, 'badge-danger'],
							[lang.warning, 'badge-warning'],
							[lang.info, 'badge-info'],
							[lang.light, 'badge-light'],
							[lang.dark, 'badge-dark']
						],
						default: 'badge-primary',
						setup: function(element){
							this.setValue(element.matchClass(new RegExp(this.getValues().join('|'))) || 'badge-primary');
						},
						commit: function(element){
							if (!element.hasClass(this.getValue()))
								element.toggleClass(this.getValue(), this.getValues());
						}
					},
					{
						id: 'pill',
						type: 'checkbox',
						label: lang.pillLabel,
						setup: function(element){
							this.setValue(element.hasClass('badge-pill'));
						},
						commit: function(element){
							element.toggleClass((this.getValue() != element.hasClass('badge-pill')) ? 'badge-pill' : null);
						}
					}
				]
			},

			{
				id: 'tab-link',
				label: lang.tabLink,
				elements: [
					{
						id: 'url',
						type: 'text',
						label: 'URL',
						setup: function(element){
							this.setValue(element.getAttribute('href'));
						},
						commit: function(element){
							if (this.getValue()){
								element.renameNode('a');
								element.setAttribute('href', this.getValue());
							}else{
								element.removeAttributes(['href', 'target']);
								element.renameNode('span');
							}
						}
					},
					{
						id: 'target',
						type: 'select',
						label: lang.targetLabel,
						items: [
							[lang.notSet, ''],
							[lang.targetBlank, '_blank'],
							[lang.targetTop, '_top'],
							[lang.targetSelf, '_self'],
							[lang.targetParent, '_parent']
						],
						setup: function(element){
							this.setValue(element.getAttribute('target') || '');
						},
						commit: function(element){
							if (element.is('a') && element.getAttribute('target') != (this.getValue() || null))
								element.toggleAttribute('target', this.getValue());
						}
					}
				]
			},

			{
				id: 'tab-icon',
				label: lang.tabIcon,
				elements: [
					{
						id: 'ico',
						type: 'text',
						label: lang.tabIcon,
						setup: function(element){
							if (element.getFirst().$.nodeName == 'SPAN')
								this.setValue(element.getFirst().getAttribute('class'));
						},
						commit: function(element){
							if(this.getValue()){
								var icon = editor.document.createElement('span');
								icon.setHtml('&nbsp;');
								icon.setAttribute('class', this.getValue());
								icon.insertBefore(element.getFirst());
							}
						}
					}
				]
			}
		],

		onShow: function(){
			var element = editor.getSelection().getStartElement();
			if (element)
				element = element.getAscendant({'span':1, 'a':1}, true);
			if (!element){
				element = editor.document.createElement('span');
				this.insertMode = true;
			}else
				this.insertMode = false;
			this.element = element;
			if (!this.insertMode)
				this.setupContent(this.element);
		},

		onOk: function(){
			this.element.toggleClass(!this.element.hasClass('badge') ? 'badge' : null);
			this.commitContent(this.element);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});
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
							for (const child of element.getChildren().$)
								if (child.nodeName == "#text")
									return this.setValue(child.nodeValue);
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
							if(element.getAttribute('class'))
								this.setValue(element.getAttribute('class').match(/badge-[^\s]+/i) || 'badge-primary');
						},
						commit: function(element){
							element.setAttribute('class', 'badge ' + this.getValue());
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
							if (this.getValue())
								element.addClass('badge-pill');
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
								element.removeAttribute('href');
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
							if (this.getValue() && element.hasAscendant('a', true))
								element.setAttribute('target', this.getValue());
							else
								element.removeAttribute('target');
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
			this.commitContent(this.element);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});
CKEDITOR.plugins.add('btbadges', {
	requires: 'dialog',
	lang: 'en,ru,uk',
	icons: 'btbadges',

	init: function(editor){
		editor.addCommand('btbadges', new CKEDITOR.dialogCommand('btbadgesDialog', {
			allowedContent: 'span[!class]; a[!class,!href,target]'
		}));

		editor.ui.addButton('btbadges', {
			label: editor.lang.btbadges.label,
			command: 'btbadges'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('btbadgesGroup');
			editor.addMenuItem('btbadgesItem', {
				label: editor.lang.btbadges.label,
				icon: this.path + 'icons/btbadges.png',
				command: 'btbadges',
				group: 'btbadgesGroup'
			});

			editor.contextMenu.addListener(function(element){
				if (element.getAscendant({'span':1, 'a':1}, true))
					return { btbadgesItem: CKEDITOR.TRISTATE_OFF };
			});
		}

		CKEDITOR.dialog.add('btbadgesDialog', this.path + 'dialogs/btbadges.js');
	}
});
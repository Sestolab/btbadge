CKEDITOR.plugins.add('btbadges', {
	requires: 'dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'btbadges,rmbtbadges',

	init: function(editor){
		editor.addCommand('btbadges', new CKEDITOR.dialogCommand('btbadgesDialog', {
			allowedContent: 'span[!class]; a[!class,!href,target]'
		}));
		editor.addCommand('rmbtbadges', {
			exec: function(editor){
				var el = editor.getSelection().getStartElement();
				el.rmClass(/badge([^\s]+|\b)/g);
				if (el.is('span') && !el.hasAttributes())
					el.remove(true);
			}
		});

		editor.ui.addButton('btbadges', {
			label: editor.lang.btbadges.label,
			command: 'btbadges'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('btbadgesGroup');
			editor.addMenuItems({
				btbadgesItem: {
					label: editor.lang.btbadges.label,
					icon: 'btbadges',
					command: 'btbadges',
					group: 'btbadgesGroup'
				},
				btbadgesRemove: {
					label: editor.lang.btbadges.remove,
					icon: 'rmbtbadges',
					command: 'rmbtbadges',
					group: 'btbadgesGroup'
				}
			});

			editor.contextMenu.addListener(function(element){
				if (element.is('span', 'a') && !element.hasClass('btn'))
					return {
						btbadgesItem: CKEDITOR.TRISTATE_OFF,
						btbadgesRemove: element.hasClass('badge') ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
					};
			});
		}

		CKEDITOR.dialog.add('btbadgesDialog', this.path + 'dialogs/btbadges.js');
	}
});
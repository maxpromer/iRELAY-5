Blockly.Blocks['irelay_5_set'] = {
	init: function () {
		this.jsonInit({
			"type": "irelay_5_set",
			"message0": Blockly.Msg.iRELAY_5_SET_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "ch",
					"options": [
						[
							"1",
							"1"
						],
						[
							"2",
							"2"
						],
						[
							"3",
							"3"
						],
						[
							"4",
							"4"
						],
						[
							"5",
							"5"
						]
					]
				},
				{
					"type": "field_dropdown",
					"name": "value",
					"options": [
						[
							Blockly.Msg.iRELAY_5_ON_MESSAGE,
							"1"
						],
						[
							Blockly.Msg.iRELAY_5_OFF_MESSAGE,
							"0"
						]
					]
				}
			],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 135,
			"tooltip": Blockly.Msg.iRELAY_5_SET_TOOLTIP,
			"helpUrl": "https://www.inex.co.th/"
		});
	},
};

Blockly.Blocks['irelay_5_set_all'] = {
	init: function () {
		this.jsonInit({
			"type": "irelay_5_set_all",
			"message0": Blockly.Msg.iRELAY_5_SET_ALL_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "value",
					"options": [
						[
							Blockly.Msg.iRELAY_5_ON_MESSAGE,
							"1"
						],
						[
							Blockly.Msg.iRELAY_5_OFF_MESSAGE,
							"0"
						]
					]
				}
			],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 135,
			"tooltip": Blockly.Msg.iRELAY_5_SET_ALL_TOOLTIP,
			"helpUrl": "https://www.inex.co.th/"
		});
	},
};

Blockly.Blocks['irelay_5_on_auto_off'] = {
	init: function () {
		this.jsonInit({
			"type": "irelay_5_on_auto_off",
			"message0": Blockly.Msg.iRELAY_5_ON_AUTO_OFF_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "ch",
					"options": [
						[
							"1",
							"1"
						],
						[
							"2",
							"2"
						],
						[
							"3",
							"3"
						],
						[
							"4",
							"4"
						],
						[
							"5",
							"5"
						]
					]
				},
				{
					"type": "input_value",
					"name": "time",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 135,
			"tooltip": Blockly.Msg.iRELAY_5_ON_AUTO_OFF_TOOLTIP,
			"helpUrl": "https://www.inex.co.th/"
		});
	},
	xmlToolbox: function () {
		return `
			<block type="irelay_5_on_auto_off">
				<value name="time">
					<shadow type="math_number">
						<field name="VALUE">5</field>
					</shadow>
				</value>
			</block>
		`;
	}
};


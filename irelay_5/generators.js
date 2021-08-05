const iRELAY_5_BEGIN = "DEV_I2C1.iRELAY_5(0, 0x38)";

Blockly.JavaScript['irelay_5_set'] = function (block) {
	var dropdown_ch = block.getFieldValue('ch');
	var dropdown_value = block.getFieldValue('value');

	var code = iRELAY_5_BEGIN + `.set(${dropdown_ch}, ${dropdown_value});\n`;
	return code;
};

Blockly.JavaScript['irelay_5_set_all'] = function (block) {
	var dropdown_value = block.getFieldValue('value');

	var code = iRELAY_5_BEGIN + `.set_all(${dropdown_value});\n`;
	return code;
};

Blockly.JavaScript['irelay_5_on_auto_off'] = function (block) {
	var dropdown_ch = block.getFieldValue('ch');
	var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);

	var code = `
	xTaskCreate([](void*) {
		${iRELAY_5_BEGIN}.set(${dropdown_ch}, 1);
		vTaskDelay((${value_time} * 1000.0) / portTICK_RATE_MS);
		${iRELAY_5_BEGIN}.set(${dropdown_ch}, 0);

		vTaskDelete(NULL);
	}, "iRELAY_5 auto on off", 1024, NULL, 10, NULL);
	`;
	return code;
};

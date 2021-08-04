#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "iRELAY_5.h"

// vTaskDelay(500 / portTICK_RATE_MS);

iRELAY_5::iRELAY_5(int bus_ch, int dev_addr) {
	channel = bus_ch;
	address = dev_addr;
}

void iRELAY_5::init(void) {
	state = s_detect;
}

int iRELAY_5::prop_count(void) {
	// not supported
	return 0;
}

bool iRELAY_5::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool iRELAY_5::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool iRELAY_5::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool iRELAY_5::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool iRELAY_5::prop_write(int index, char *value) {
	// not supported
	return false;
}

void iRELAY_5::process(Driver *drv) {
	i2c = (I2CDev *)drv;

	switch (state) {
		case s_detect:
			// detect i2c device
			if (i2c->detect(channel, address) == ESP_OK) {
				// Set mode to OUTPUT
				uint8_t dataSend[2] = {
					3,   // Configuration register
					0x00 // All to OUTPUT
				};
				if (i2c->write(channel, address, dataSend, 2) == ESP_OK) {
					error = false;
					initialized = true;
					dataUpdateFlag = true;
					state = s_poll;
				} else {
					state = s_error;
				}
			} else {
				state = s_error;
			}
			break;

		case s_poll:
			if (dataUpdateFlag) {
				if (i2c->write(channel, address, this->data, 1) == ESP_OK) {
					dataUpdateFlag = false;
				} else {
					state = s_error;
				}
			}
			break;

		case s_error:
			// set error flag
			error = true;
			// clear initialized flag
			initialized = false;
			// get current tickcnt
			tickcnt = get_tickcnt();
			// goto wait and retry with detect state
			state = s_wait;
			break;

		case s_wait:
			// delay 1000ms before retry detect
			if (is_tickcnt_elapsed(tickcnt, 1000)) {
				state = s_detect;
			}
			break;
	}
}

void iRELAY_5::set(uint8_t ch, bool value) {
	if (ch < 1 || ch > 8) return;

	if (value) {
		this->data |= 1 << (ch - 1);
	} else {
		this->data &= ~(1 << (ch - 1));
	}
	this->dataUpdateFlag = true;
}

void iRELAY_5::set_all(bool value) {
	if (value) {
		this->data = 0xFF;
	} else {
		this->data = 0x00;
	}
	this->dataUpdateFlag = true;
}

void iRELAY_5::on_auto_off(uint8_t ch, uint32_t time) {
	this->set(ch, 1);

	xTaskCreate([](void* this_obj) {
		vTaskDelay((time * 1000.0) / portTICK_RATE_MS);
		(iRELAY_5*)(this_obj)->set(ch, 0);

		vTaskDelete(NULL);
	}, "iRELAY_5 auto on off", 256, (void*)(this), 10, NULL);
}

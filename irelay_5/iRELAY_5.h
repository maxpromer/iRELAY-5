#ifndef __iRELAY_5_H__
#define __iRELAY_5_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

class iRELAY_5 : public Device {
	private:
		enum {
			s_detect, 
			s_poll, 
			s_error, 
			s_wait
		} state;
		TickType_t tickcnt;

		I2CDev *i2c;

		uint8_t data = 0;
		bool dataUpdateFlag = false;

	public:
		// constructor
		iRELAY_5(int bus_ch, int dev_addr);
		// override
		void init(void);
		void process(Driver *drv);
		int prop_count(void);
		bool prop_name(int index, char *name);
		bool prop_unit(int index, char *unit);
		bool prop_attr(int index, char *attr);
		bool prop_read(int index, char *value);
		bool prop_write(int index, char *value);

		// method
		void set(uint8_t ch, bool value) ;
		void set_all(bool value) ;

};

#endif

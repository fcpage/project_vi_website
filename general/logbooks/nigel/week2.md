## Tasks

- [x] Implement Car/Floor Controller message handler
- [x] Test CAN comms between two nucleos
- [ ] Test CAN comms between elevator nodes
- [x] Test CAN comms with supervisory controller using CAN
- [ ] Implement Elevator controller (Arduino)

## Notes

CAN comms are kept consistent between modules by using a common
header file  (`CAN_protocol.h`). When included in a C file, all
symbols within it will be prefixed with `CAN_`. When included in
a C++ file all symbols are placed in a CAN namespace.

This header file gives the definitions of two enums which
provide the necessary values for each node ID number and the
valid messages that can be sent over CAN.

The STM CAN code uses a lookup table for mapping button presses
to the correct LED indicator pin and the message that should be
sent.

The same firmware is used for both the Car Controller, and the
Floor controller. In order to set which floor number and whether
or not it is the car controller, you simply define a macro at
the command line when building.

```bash
cmake --build build/Debug --target flash -- -DNODE_ID=CC
```

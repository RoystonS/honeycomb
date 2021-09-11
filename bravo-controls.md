# Honeycomb Bravo Throttle Control mappings

Disclaimer: I am not associated with Honeycomb, the makers of the Bravo, in any way. I've discovered this information purely via trial and error and so I can take no responsibility for errors or omissions or what happens if you make use of this information. Use at your own risk!

---
Some of the controls and buttons are shown in the diagram in MSFS, but not all. Similarly, in the Windows 'USB Game Controllers' control panel, not all buttons are shown.

Here's the full controls listing for the Bravo Throttle together with the default binding in MSFS:

## Button types

Some controls act as 'momentary' button presses; for example, the autopilot row buttons such as `APR` and `REV` are considered pressed only whilst you actively press the button.

Other controls behave as multiple permanent switches. For example, whilst the gear lever is up, button 31 is pressed and stays pressed and button 32 is released; moving the gear lever down releases button 31 and presses and holds button 32 instead.

### Using 'held buttons' with MSFS

These 'held' buttons can be hard to work with in the MSFS 'Controls Options' screen. When using 'Search by input' or 'Start scanning', MSFS waits for a button to be pressed _and released_. If you press a button and don't release it, the whole simulator is blocked until you release it.

So, if you want to check the bindings for, say, moving the gear lever down, you need to:

- Move the gear lever up
- Tell MSFS to start scanning
- Move the gear lever down
- MSFS will notice the button 32 press and report it
- MSFS will now block, waiting for button 32 to be released
- Move the gear lever up again
- MSFS will now unblock

## Autopilot button row

N.B. The autopilot IAS/VRS/HDG/VS/ALT selector knob is complex enough to get its own section. See below.

These are all 'momentary' switches that trigger only whilst the button is pressed in.

| Button number | Control | MSFS Default Binding |
|-|-|-|
|1|`HDG` autopilot button| `TOGGLE AUTOPILOT HEADING HOLD` |
|2|`NAV` autopilot button| `AUTOPILOT NAV1 HOLD`
|3|`APR` autopilot button| `TOGGLE AUTOPILOT APPROACH HOLD`
|4|`REV` autopilot button| `TOGGLE AUTOPILOT BACKCOURSE HOLD`
|5|`ALT` autopilot button| `TOGGLE AUTOPILOT ALTITUDE HOLD`
|6|`VS` autopilot button| `TOGGLE AUTOPILOT VS HOLD`
|7|`IAS` autopilot button| `TOGGLE AUTOPILOT FLIGHT LEVEL CHANGE`
|8|`AUTO PILOT` master button| `TOGGLE AUTOPILOT MASTER`
|13| autopilot value knob increment | `PLUS`
|14| autopilot value knob decrement | `MINUS`


## Autopilot value selectors

These are all 'held' buttons, generating a 'pressed down' for the specified button whilst the knob remains in its position.

| Button number | Control | MSFS Default Binding |Notes|
|-|-|-|-|
| 17 | Knob at `IAS` setting | `SET AUTOPILOT AIRSPEED HOLD`
| 18 | Knob at `CRS` setting | `VOR OBS`|controls VOR1 but not VOR2
| 19 | Knob at `HDG` setting | `SELECT HEADING BUG`
| 20 | Knob at `VS` setting | `SELECT VSI BUG` AND `SET AUTOPILOT VS HOLD`|This is a bug. See 'Bugs' below.|
| 21 | Knob at `ALT` setting | `SELECT ALTITUDE BUG`

## Gear

These are all 'held' buttons, generating a 'pressed down' for the specified button whilst the lever remains in its position.

| Button number | Control | MSFS Default Binding |
|-|-|-|
| 31 | Gear Lever Up | `GEAR UP`
| 32 | Gear Lever Down | `GEAR DOWN`

## Switches

These are all 'held' buttons, generating a 'pressed down' for the specified button whilst the switch remains in its position.

| Button number | Control | MSFS Default Binding | Notes |
|-|-|-|-|
| 34 | Switch 1 Up | `BEACON LIGHTS ON`
| 35 | Switch 1 Down | `BEACON LIGHTS OFF`
| 36 | Switch 2 Up | `LANDING LIGHTS ON`
| 37 | Switch 2 Down | `LANDING LIGHTS OFF`
| 38 | Switch 3 Up | `TAXI LIGHTS ON` |(doesn't seem to work; see 'Bugs' below)
| 39 | Switch 3 Down | `TAXI LIGHTS OFF`|(doesn't seem to work; see 'Bugs' below)
| 40 | Switch 4 Up | `NAV LIGHTS ON`|(doesn't seem to work; see 'Bugs' below)
| 41 | Switch 4 Down | `NAV LIGHTS OFF`|(doesn't seem to work; see 'Bugs' below)
| 42 | Switch 5 Up | `STROBES ON`
| 43 | Switch 5 Down | `STROBES OFF`
| 44 | Switch 6 Up | `PITOT HEAT ON`
| 45 | Switch 6 Down | `PITOT HEAT OFF`
| 46 | Switch 7 Up | `AVIONICS MASTER 1 ON`
| 47 | Switch 7 Down | `AVIONICS MASTER 1 OFF`

## Flaps lever

These are all 'momentary' switches that trigger only whilst the lever is held away from the central position.

| Button number | Control | MSFS Default Binding |
|-|-|-|
|15| Flaps lever down | `INCREASE FLAPS`
|16| Flaps lever up | `DECREASE FLAPS`

## Trim wheel

| Button number | Control | MSFS Default Binding |
|-|-|-|
|22| Trim wheel forwards | `ELEVATOR TRIM DOWN`
|23| Trim wheel backwards | `ELEVATOR TRIM UP`

## Levers

These are the analog axes for the main levers:

|Axis name| Lever | MSFS Default Binding |
|-|-|-|
|L-Axis Y| Lever 1 | `THROTTLE 1 AXIS`|
|L-Axis X| Lever 2 | `THROTTLE 2 AXIS`|
|R-Axis Z| Lever 3 | `PROPELLER 1 AXIS`|
|R-Axis Y| Lever 4 | `PROPELLER 2 AXIS`|
|R-Axis X| Lever 5 | `MIXTURE 1 AXIS (-100 TO 100%)`|
|L-Axis Z| Lever 6 | `MIXTURE 2 AXIS (-100 TO 100%)`|

Pulling levers back beyond the 'Flight Detent' point acts as extra joystick buttons:

| Button number| Control | MSFS Default Binding |
|-|-|-|
|24| Lever 1 | `THROTTLE 1 DECREASE`
|25| Lever 2 | `THROTTLE 2 DECREASE`
|26| Lever 3 | `TOGGLE FEATHER SWITCH 1`
|27| Lever 4 | `TOGGLE FEATHER SWITCH 2`
|28| Lever 5 | `DECREASE MIXTURE 1`
|33| Lever 6 | `DECREASE MIXTURE 2`

## Lever buttons

There are two buttons on the levers. These are mapped in a slightly curious way, so we'll give them names `BUTTON1` and `BUTTON2`:

- `A` - the 'Go Around' button on the 'GA' levers and the 'Reverser' lever on the 'Commercial' levers
- `B` - the red TOGA button on 'Commercial' lever 1

| Button number | Control | MSFS Default Binding |
|-|-|-|
|29| Lever 1 `A`<br/>and<br/>Lever 2 `B` | `AUTO THROTTLE TO GA` |
|9| Lever 2 `A` | _not bound_
|10| Lever 3 `A` | _not bound_
|30| Lever 3 `B` | _not bound_
|11| Lever 4 `A` | _not bound_
|48| Lever 4 `B` | _not bound_
|12| Lever 5 `A` | _not bound_

(Levers 1 and 5 don't support `B` and Lever 6 doesn't support buttons at all.)

# Bugs

There are a couple of issues with the default bindings:

## VS autopilot selector

The default binding for button 20 (turning the knob to the `VS` setting ) is 
`SELECT VSI BUG` AND `SET AUTOPILOT VS HOLD`. That configures the `PLUS` and `MINUS` actions to control the VS fpm value but also immediately switches the autopilot to VS mode using a 'held' button.

This should be changed to map _only_ to `SELECT VSI BUG` by removing the `SET AUTOPILOT VS HOLD` mapping.

Rmag has a good video from December 2020 walking through this in detail: https://www.youtube.com/watch?v=bJSBxbmC3Eo

## Light switches not working

At least when I've been trying this out (September 2021, just after MSFS World Update 6) some light switches haven't worked for me. Specifically, the default bindings for switches 1 (Beacon), 2 (Landing), 5-7 (Strobe, Pitot, Avionics) were all fine, but switches 3 (Taxi) and 4 (Nav) didn't work. It seems to be the case that `TAXI LIGHTS ON`, `TAXI LIGHTS OFF`, `NAV LIGHTS ON` and `NAV LIGHTS OFF` don't work at all; at least for me they didn't even work when bound to keyboard buttons. Others in the MSFS forums have reported issues with the Beacon lights too.

The workaround is to use `SET xxx LIGHTS` instead of `xxx LIGHTS ON` and `xxx LIGHTS OFF`. These commands turn the lights on whilst the bound button remains pressed, and turns them off when it's released.  A small downside is that switches bound in this way take a second or so to respond when switched off instead of responding immediately.

So, change:

| Button number | Control | MSFS Default Binding |
-|-|-|
| 38 | Switch 3 Up | `TAXI LIGHTS ON` |
| 39 | Switch 3 Down | `TAXI LIGHTS OFF`|
| 40 | Switch 4 Up | `NAV LIGHTS ON`|
| 41 | Switch 4 Down | `NAV LIGHTS OFF`|
to

| Button number | Control | MSFS Default Binding |
-|-|-|
| 38 | Switch 3 Up | `SET TAXI LIGHTS` |
| 39 | Switch 3 Down | _unbound_ |
| 40 | Switch 4 Up | `SET NAV LIGHTS` |
| 41 | Switch 4 Down | _unbound_ |

For me, this makes those buttons work.

# Feedback

If there's something in this document that's missing, incorrect, or unclear, please let me know by filing an issue in GitHub or submitting a pull request.

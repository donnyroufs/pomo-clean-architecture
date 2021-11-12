<p align="enter" style="text-align: center;">
  <img src="https://i.imgur.com/CPtKGhg.png" width="100%">
</p>

Just doing small dummy projects to understand Clean Architecture. I really walked against a wall with the timer,
since I'm not sure how the infrastructure should subscribe to the timer, or if they even should. Fixed it by adding a callback
to the use-case which feels very wrong... Perhaps an eventbus, or exposing some kind of entity outside the domain could do the trick.

<p align="enter" style="text-align: center;">
  <img src="https://i.imgur.com/L3R1x62.png" width="100%">
</p>

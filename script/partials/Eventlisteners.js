var deferredPrompt;
var pwainstall = document.getElementById('pwainstall');

window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  if (pwainstall) {
    pwainstall.style.display = 'block';
  }
});
if (pwainstall) {
  pwainstall.addEventListener('click', function (e) {
    // hide our user interface that shows our A2HS button
    pwainstall.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then(function (choiceResult) {
        deferredPrompt = null;
      });
  });
}

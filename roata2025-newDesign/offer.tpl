{block name="add_char"}
  <div class="left-side">
  {* <img src="{$asset}/png/bg-smoke-mobile2.webp" alt="girls" class="mobile shape" /> *}

    <div class="container-full">
      <div class="offer-content">
        <div class="offer">
          <div class="line-1">până la</div> 
          <div class="line-2">
            <span>1000</span>
            <div><span>rotiri</span> <span>gratis</span></div>
          </div>
          <div class="line-3">Fără Depunere</div>
        </div>
      </div>

      <div class="center-img">
        <div class="c-roata">
          <img src="{$asset}/png/roata2.webp" alt="roata" class="roata" />
        </div>
        <img src="{$asset}/png/girls4.webp" alt="girls" class="girlsDesktop"/>
        <img src="{$asset}/png/fog3.webp" alt="girls" class="fog"/>
      </div>
      <div class="_btn-container">
        <button class="cta-button desktop" data-effect="throb">
          <span class="text">{$btn_text}</span>
          <span class="shimmer"></span>
        </button>
      </div>
      <div class="items">
        {include file="{$path_to_shared.templates.brand}/template-2024/utils/storeIcons.tpl"}
        {include file="{$path_to_shared.templates.brand}/template-2024/utils/trustPilot.tpl"}

      </div>
      <div class="c-bonusCode">
        <div>COD BONUS</div>
        <div>{$bonusCode}</div>
      </div>
      <div class="absolute-img">
        <img src="{$asset}/png/crown.webp" alt="" />
        <img src="{$asset}/png/star.webp" alt="" />
        <img src="{$asset}/png/seven.webp" alt="" />
      </div>
    </div>

  </div>
{/block}
{block name="offer_html"}
  <div class="offer-content">
    <div class="line-1">pana la</div>
    <div class="line-2">
      <span>1000</span>
      <div><span>rotiri</span> <span>gratis</span></div>
    </div>
    <div class="line-3">Fara Depunere</div>
  </div>
{/block}
{block name="offer_css"}
  {include file="{$smarty.current_dir}/css.tpl"}
{/block}
{block append name=js}
  {literal}
    <script>
      $(document).ready(function() {
        const wheel = $(".roata");
        let isSpinning = false;

        const blurStyle = `
      .roata {
          transition: filter 0.8s ease-in-out;
          filter: blur(0px);
      }
      .blur-start {
          filter: blur(1px);
          transition: filter 1.2s ease-in;
      }
      .blur-peak {
          filter: blur(2px);
          transition: filter 1s ease-in-out;
      }
      .blur-ending {
          filter: blur(0px);
          transition: filter 1.5s ease-out;
      }
    `;
        $("<style>").text(blurStyle).appendTo("head");

        const TIMINGS = {
          WHEEL_SPIN: 3500,
          RESET_DELAY: 500,
        };

        function isMobileDevice() {
          return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }



        function startSpin() {
          console.log("🎡 Starting wheel spin");
          return new Promise((resolve) => {
            wheel.addClass("blur-start");

            setTimeout(() => {
              wheel.removeClass("blur-start").addClass("blur-peak");
            }, 400);

            wheel.css({
              transition: `transform ${TIMINGS.WHEEL_SPIN}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              transform: "rotate(1440deg)",
            });

            setTimeout(() => {
              wheel.removeClass("blur-peak").addClass("blur-ending");
            }, TIMINGS.WHEEL_SPIN - 550);

            setTimeout(() => {
              console.log("✨ Wheel spin completed");
              wheel.removeClass("blur-ending");
              resolve();
            }, TIMINGS.WHEEL_SPIN);
          });
        }

        function resetWheel() {
          console.log("🔄 Resetting wheel position");
          return new Promise((resolve) => {
            wheel.css({ transition: "none", transform: "rotate(0deg)" });
            setTimeout(() => {
              console.log("🔄 Wheel reset completed");
              resolve();
            }, 450);
          });
        }

        async function animationSequence() {
          if (isSpinning) {
            console.log("⚠️ Wheel is already spinning");
            return;
          }

          isSpinning = true;
          console.log("🎯 Starting animation sequence");

          try {
            await resetWheel();
            await startSpin();


            // console.log("🧹 Confetti animation ended");

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds after confetti

            console.log("✅ Animation sequence completed. Starting next spin.");
            isSpinning = false;
          } catch (error) {
            console.error("❌ Animation sequence error:", error);
            isSpinning = false;
          }

          // Start the animation loop again
          animationSequence();
        }

        // Start animation automatically after 2 seconds when page is fully loaded
        console.log("🚀 Page loaded, starting animation in 2 seconds...");

        setTimeout(() => {
          animationSequence();
        }, 2000); // Wait 2 seconds after page load before starting the animation
      });
    </script>
  {/literal}
{/block}
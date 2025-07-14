{include file="{resource_path()}/views/pages/landing/shared/general/variables.tpl"}

{* {$link = $cta[$product]} *}

{$dark_theme=true scope=parent}
{$alt_steps_design=false scope=parent}
{$steps_cta=true scope=parent}

{$steps = [
  [
    'icon' => 'register',
    'heading' => 'ÎNREGISTREAZĂ-TE',
    'text' => 'Creează-ți un cont <br/> <span style="color:#fff;">folosind codul ROTIRIGRATIS</span>'
  ],
  [
    'icon' => 'deposit',
    'heading' => 'VALIDEAZĂ CONTUL',
'text' => '<span style="color:#fff;">Trimite documentele și așteaptă confirmarea</span>'
  ],
  [
    'icon' => 'play',
    'heading' => 'ÎNVÂRTE ROATA',
    'text' => 'Descoperă <br/> <span style="color:#fff;">premiul tău garantat!</span>'
  ]
] scope=parent}


{$version = "A"} {* A - no FORM // B - add FORM*}
{$version_SPA = "singlePage"} {* var for SPA or Scroll *}
{$version_page = "vCasino"} {* var for casino or sport *}
{$background_desktop = "{$asset}/screenshot.jpg"}
{$background_mobile = "{$asset}/bg-mobile1.webp"}
{$background_tablet = "{$asset}/bg-mobile1.webp"}
{$bonusCode = "CAIRO"}
{$bgVideo = "true"}
{$wheelPage = "wheel"}
{$btn_text = "ÎNVÂRTE ROATA"}
{include file="{$smarty.current_dir}/offer.tpl"}
{capture assign="terms"}
    {include file="{$smarty.current_dir}/terms.tpl"}
{/capture}
{extends file="{$path_to_shared.templates.brand}/template-2024/template.tpl"}
{include
file="{resource_path()}/views/pages/landing/shared/general/variables.tpl"}
{$register_text = "Înregistrează-te"} {$version = "D"} {$noScroll = "noScroll"}
 {$promo_text = "
<span>CEL MAI MARE CAZINO ONLINE</span>
DIN ROMÂNIA"} {$banner = 'banner_welcome'} {*{$section_title = 'CELE MAI
POPULARE JOCURI DE CAZINO online'}*} {$banner_text = 'PROFITĂ ACUM
<br />
DE OFERTĂ'} {$section_pay = "metode de plată"} {$top_games_list = [ 'ro' => [
'shining-crown', 'sweet-bonanza', 'Big_Bonanza','100_Hot' ] ]} {$steps = [
"ÎNREGISTREAZĂ-TE ACUM
<br />
PE NETBET CAZINO", "ÎNSCRIE-TE LA PROMOȚIE
<br />
ȘI JOACĂ ACUM", "BUCURĂ-TE DE PREMIILE
<br />
CASH ȘI RUNDELE GRATUITE" ]} {$providers_list = [ 'ro' => [ 'egt',
'pragmatic-play', 'novomatic', 'play-n-go', 'evolution-gaming', 'relax-gaming',
'isoftbet', 'microgaming', 'netent' ] ]} {include
file="{$smarty.current_dir}/offer.tpl"} {capture assign="terms"} {include
file="{$smarty.current_dir}/terms.tpl"} {/capture} {extends
file="{$path_to_shared.templates.brand}/template-new/template.tpl"} {assign
var="query" value=$smarty.server.QUERY_STRING}


{if $query|strstr:"playerId="}
  {assign var="playerIdStr" value=$query|regex_replace:"/^.*[?&]playerId=([^&]+).*$/":"$1"}
{else}
  {assign var="playerIdStr" value="default_player_id"}
{/if}
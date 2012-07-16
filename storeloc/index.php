<div id="bgmaps"></div>
	<div id="mapcontrols">
		<div class="slidetitle">Store locator</div>
		<h2>Zoek bij jou in de buurt</h2>
		<form id="storeloc">
			<p>Plaatsnaam/postcode/adres:</p>
			<input type="text" id="addressInput" size="10"/>
			<p>binnen een straal van:</p>
			<select id="radiusSelect">
				<option value="1">1km</option>
				<option value="5">5km</option>
				<option value="10" selected>10km</option>
				<option value="20">20km</option>
				<option value="30">30km</option>
			</select>
			<input id="storelocbutton" type="submit" value="Zoeken"/>
		</form>
		<div><select id="locationSelect"></select></div>
	</div><!-- End mapcontrols -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Registration request</title>
</head>
<body>
<p>We received a request for ${email} to log in to the app: '${appName}'</p>
<table cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
            Time: <b>${new Date()}</b> this link will expire in ${expiresInMinutes} minutes
        </td>
    </tr>

</table>
<p>
    %{--<createLink controller="login" action="login" absolute="true" params="[uid: '${uuid}']">To log in, click here</createLink>--}%
    <a href="${loginLink}" target="_blank">To complete the registration process, click here</a>
</p>
<p>
    If not, please ignore this email.
</p>
</body>
</html>
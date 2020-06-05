module.exports.createOrederMail = (data) => {
  let prodLineHTML = "";
  data.products.forEach((elem) => {
    prodLineHTML += `<tr>
        <td valign="top" style="padding:12px 0px 12px 0px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                style="border-collapse:collapse;empty-cells:show;table-layout:fixed">
                <tbody>
                    <tr>
                        <td align="left" valign="top" width="60" style="padding:4px 12px 0px 12px">
                            <a href="https://dev.queenbohemia.ru/product/${
                              elem.slug
                            }"
                                style="display:block"
                                data-vdir-href="https://mail.yandex.ru/re.jsx?uid=1130000030508019&amp;c=LIZA&amp;cv=19.3.207&amp;mid=170573835886665312&amp;h=a,EWYR2vyyGbCnsDxFaCXslA&amp;l=aHR0cHM6Ly9tb3RvcmZpcnN0LnJ1L2NhdGFsb2dfbW90by9tYW4vcmFpbmNvYXQvbW90ZXFfMThfZG96aGRldmlrX2tvbXBsZWt0X3ZvZG9uZXByb25pdHNhZW15al9zaHRhbnlrdXJ0a2Ffd2V0X2RvZ19ibGFja3llbGxvdy8"
                                data-orig-href="https://dev.queenbohemia.ru/product/${
                                  elem.slug
                                }"
                                class="daria-goto-anchor" target="_blank" rel="noopener noreferrer">
                                <img height="60" width="60" style="display:block"
                                    src="https://dev.dev.queenbohemia.ru/image/products/${
                                      elem.path_to_photo[0]
                                    }">
                            </a>
                        </td>
                        <td align="left" valign="top" style="padding:0px 12px 0px 12px">
                            <b><a href="https://dev.queenbohemia.ru/product/${
                              elem.slug
                            }"
                                    style="color:#00094D;font-size:11px;line-height:16px;text-decoration:none"
                                    data-vdir-href="https://mail.yandex.ru/re.jsx?uid=1130000030508019&amp;c=LIZA&amp;cv=19.3.207&amp;mid=170573835886665312&amp;h=a,EWYR2vyyGbCnsDxFaCXslA&amp;l=aHR0cHM6Ly9tb3RvcmZpcnN0LnJ1L2NhdGFsb2dfbW90by9tYW4vcmFpbmNvYXQvbW90ZXFfMThfZG96aGRldmlrX2tvbXBsZWt0X3ZvZG9uZXByb25pdHNhZW15al9zaHRhbnlrdXJ0a2Ffd2V0X2RvZ19ibGFja3llbGxvdy8"
                                    data-orig-href="https://dev.queenbohemia.ru/product/${
                                      elem.slug
                                    }"
                                    class="daria-goto-anchor" target="_blank"
                                    rel="noopener noreferrer">${
                                      elem.name
                                    }</a></b>

                            <div style="color:#9e9e9e;font-size:12px;line-height:20px;padding-top:4px">
                                Арт. <span class="wmi-callto">${
                                  elem.slug
                                }</span>
                            </div>
                        </td>
                        <td align="center" valign="top" width="60"
                            style="color:#00094D;font-size:12px;line-height:20px;padding:0px 12px 0px 12px">
                            ${data.ok.products[elem.slug].countIn}
                        </td>
                        <td align="right" valign="top" width="120"
                            style="color:#2a2a2a;font-size:12px;line-height:20px;padding:0px 12px 0px 12px">
                            ${
                              data.ok.products[elem.slug].sale
                                ? data.ok.products[elem.slug].sale_price
                                : data.ok.products[elem.slug].regular_price
                            } р.
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>`;
  });
  return `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office" class="gr__dev_motorfirst_ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="format-detection" content="telephone=no,address=no">


    <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->

    <title></title>
    <style>
        * {
            font-family: Verdana, Geneva, sans-serif;
        }

        @media (prefers-color-scheme:dark) {}
    </style>

</head>

<body
    style="padding: 0 !important;margin: 0 !important;background-color: #ffffff;font-family: Verdana, Geneva, sans-serif;mso-line-height-rule: exactly;"
    data-gr-c-s-loaded="true">
    <div
        style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">

    </div>

    <div class="gmailfix"
        style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
        ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
    </div>
    <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &amp;nbsp; &amp;nbsp; &amp;nbsp;
        &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
        &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
        &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; </div>


    <table role="presentation" width="100%" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
        bgcolor="#ffffff" style="table-layout: fixed;min-width: 696px;border-collapse: collapse;">
        <tbody>


           <!-- ! HEAD -->

            <tr>
                <td height="64px" align="center" bgcolor="#C4DCF3"
                    style="padding: 0px 24px 0px 24px;border-bottom: 1px solid #ADC9E3;">
            
            
                    <table width="624px" cellpadding="0" border="0" cellspacing="0" align="center" valign="top" bgcolor="#C4DCF3"
                        style="table-layout: fixed;border-collapse: collapse;background-color: #C4DCF3;">
            
                        <tbody>
                            <tr>
                                <td align="left" valign="middle" style="padding: 0px 12px 0px 12px">
                                    <a href="http://dev.queenbohemia.ru" style="display: block;width: 100%;height: 100%;">
                                        <img src="https://dev.queenbohemia.ru/image/mail/logo.png" alt="Queen of Bohemia" width="253px"
                                            height="35px" style="display: block;width: 253px;height: 35px;">
                                    </a>
                                </td>
                                <td align="right" valign="middle" style="padding: 0px 12px 0px 12px;">
                                    <a href="tel:+78008085878"
                                        style="color: #00094D; font-size: 14px; font-weight: 600;display: inline-block;text-decoration: none;white-space: nowrap;">
                                        +7 800 808-58-78
                                    </a>
                                </td>
                            </tr>
            
                        </tbody>
                    </table>
                </td>
            </tr>


<tr>
    <td style="padding: 48px 0px 48px 0px;">
        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
            style="table-layout: fixed;border-collapse: collapse;">
            <tbody>
                <tr>
                    <td>
                        <table width="624px" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
                            style="table-layout:auto;border-collapse:collapse">
                            <tbody>
                                <tr>
                                    <td style="padding:0px 12px 0px 12px">
                                        <table width="auto" cellpadding="0" border="0" cellspacing="0" align="left" valign="top"
                                            style="table-layout:fixed!important;border-collapse:collapse">
                                            <tbody>
                                                <tr>
                                                    <td align="left" valign="top" style="padding-right:16px;padding-top:1px;font-size:24px">
                                                        <img src="https://dev.queenbohemia.ru/image/mail/cart.png"
                                                            alt="" width="24px" height="24px" style="display:block" class="CToWUd">
                                                    </td>
                        
                                                    <td align="left" valign="top"
                                                        style="min-height:28px;font-size:22px;line-height:28px;font-family:Arial,Helvetica,sans-serif;color:#00094D;letter-spacing:0.24px;text-transform:uppercase">
                                                        <b>Заказ <small>№</small>${
                                                          data.ok.dbid
                                                        }</b>
                                                    </td>
                        
                                                    <td align="left" valign="bottom"
                                                        style="padding:1px 0px 1px 24px;font-size:10px;line-height:20px;color:#999b9b;letter-spacing:0.16px">
                                                        Создан ${data.ok.date}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                        
                                <tr>
                                    <td style="padding:0px 12px 0px 12px">
                                        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="left" valign="top"
                                            style="table-layout:fixed;border-collapse:collapse">
                                            <tbody>
                                                <tr>
                        
                                                    <td align="left"
                                                        style="padding:32px 12px 0px 0px;font-size:14px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                        Заказ был успешно создан и оплачен. Мы свяжемся с вами в ближайшее время для подтверждения заказа и согласования
                                                        деталей.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td align="left" style="padding-top: 48px;">
                        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
                            style="table-layout: fixed;border-collapse: collapse;">
                            <tbody>
                                <tr>
                                    <td style="padding: 8px 0px 8px 0px;">

                                        <table width="624px" cellpadding="0" border="0" cellspacing="0" align="center"
                                            valign="top"
                                            style="table-layout: fixed;border-collapse: collapse;font-size: 12px;line-height: 20px;color: #718DA7;">

                                            <tbody>
                                                <tr>
                                                    <td align="left" valign="middle"
                                                        style="padding: 0px 12px 0px 12px;">
                                                        Название / Цвет / Размер
                                                    </td>
                                                    <td width="60px" align="center" valign="middle"
                                                        style="padding: 0px 12px 0px 12px;">
                                                        Кол-во
                                                    </td>
                                                    <td width="120px" align="right" valign="middle"
                                                        style="padding: 0px 12px 0px 12px;">
                                                        Цена
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="border-top-color:#f1f1f1;border-top-style:solid;border-top-width:1px">

                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="624"
                                            style="border-collapse:collapse;table-layout:fixed">
                                            <tbody>
                                                ${prodLineHTML}
                                            </tbody>
                                        </table>

                                    </td>
                                </tr>

                                <tr>
                                    <td height="36px" valign="middle" style="background-color: #fafafa;">

                                        <table width="624px" height="100%" cellpadding="0" border="0" cellspacing="0"
                                            align="center" valign="top"
                                            style="table-layout: fixed;border-collapse: collapse;">

                                            <tbody>
                                                <tr>
                                                    <td align="right" valign="middle"
                                                        style="padding: 2px 12px 0px 12px;font-size: 12px;line-height: 24px;color: #9e9e9e;">
                                                        Итого:
                                                    </td>

                                                    <td width="120px" align="right" valign="middle"
                                                        style="padding: 0px 12px 0px 12px;font-size: 12px;line-height: 24px;color: #00094D;">
                                                        <b>${data.ok.sum} р.</b>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td align="right" valign="middle"
                                                        style="padding: 2px 12px 0px 12px;font-size: 12px;line-height: 24px;color: #9e9e9e;">
                                                        Промокод:
                                                    </td>
                                                
                                                    <td width="120px" align="right" valign="middle"
                                                        style="padding: 0px 12px 0px 12px;font-size: 12px;line-height: 24px;color: #BA250D;">
                                                        <b>– 1000 р.</b>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td align="right" valign="top"
                                                        style="padding: 2px 12px 0px 12px;font-size: 12px;line-height: 24px;color: #9e9e9e;">
                                                        Доставка:
                                                    </td>
                                                
                                                    <td width="120px" align="right" valign="middle"
                                                        style="padding: 0px 12px 5px 12px;font-size: 12px;line-height: 24px;color: #00094D;">
                                                        <b>${
                                                          data.ok.delivery
                                                            .deliveryForCustomer
                                                        } р.</b>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding-top: 48px;">

                                        <table width="624px" cellpadding="0" border="0" cellspacing="0" align="center"
                                            valign="top" style="table-layout: fixed;border-collapse: collapse;">

                                            <tbody>
                                                <tr>
                                                    <td width="66.67%" valign="top">
                                                        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
                                                            style="table-layout:fixed;border-collapse:collapse">
                                                
                                                            <tbody>
                                                                <tr>
                                                                    <td width="50%" valign="top" style="padding:0px 12px 0px 12px">
                                                                        <b
                                                                            style="display:block;padding-bottom:4px;font-size:10px;line-height:16px;color:#718DA7">Имя</b>
                                                
                                                                        <div style="font-size:12px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                                            Тест
                                                                        </div>
                                                                    </td>
                                                
                                                                    <td width="50%" valign="top" style="padding:0px 12px 0px 12px">
                                                                        <b
                                                                            style="display:block;padding-bottom:4px;font-size:10px;line-height:16px;color:#718DA7">Город</b>
                                                
                                                                        <div style="font-size:12px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                                            ${
                                                                              data
                                                                                .ok
                                                                                .delivery
                                                                                .recipient
                                                                                .address
                                                                                .locality
                                                                            }                                                                            }
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                
                                                                <tr>
                                                                    <td width="50%" valign="top" style="padding:24px 12px 0px 12px">
                                                                        <b
                                                                            style="display:block;padding-bottom:4px;font-size:10px;line-height:16px;color:#718DA7">Email</b>
                                                
                                                                        <div style="font-size:12px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                                            ${
                                                                              data
                                                                                .ok
                                                                                .delivery
                                                                                .recipient
                                                                                .email
                                                                            }
                                                                        </div>
                                                                    </td>
                                                
                                                                    <td width="50%" valign="top" style="padding:24px 12px 0px 12px">
                                                                        <b
                                                                            style="display:block;padding-bottom:4px;font-size:10px;line-height:16px;color:#718DA7">Телефон</b>
                                                
                                                                        <div style="font-size:12px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                                            ${
                                                                              data
                                                                                .ok
                                                                                .delivery
                                                                                .contacts[0]
                                                                                .phone
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                
                                                            </tbody>
                                                        </table>
                                                
                                                    </td>
                                                
                                                    <td width="33.34%" valign="top">
                                                        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="top" valign="top"
                                                            style="table-layout:fixed;border-collapse:collapse">
                                                
                                                            <tbody>
                                                                <tr>
                                                                    <td width="100%" valign="top" style="padding:0px 12px 0px 12px">
                                                                        <b style="display:block;padding-bottom:4px;font-size:10px;line-height:16px;color:#718DA7">Доставка</b>
                                                
                                                                        <div style="font-size:12px;line-height:20px;color:#00094D;letter-spacing:0.24px">
                                                                            <span>${
                                                                              data
                                                                                .ok
                                                                                .delivery
                                                                                .deliveryType ===
                                                                              "PICKUP"
                                                                                ? "Пункт выдачи"
                                                                                : "Курьер"
                                                                            }</span>
                                                                            <br><br>
                                                                            <span style="display: inline-block;">${
                                                                              data
                                                                                .ok
                                                                                .delivery
                                                                                .deliveryType ===
                                                                              "PICKUP"
                                                                                ? data
                                                                                    .ok
                                                                                    .delivery
                                                                                    .pickupPoint
                                                                                    .addressString
                                                                                : "г. " +
                                                                                  data
                                                                                    .ok
                                                                                    .delivery
                                                                                    .recipient
                                                                                    .address
                                                                                    .locality +
                                                                                  ", ул. " +
                                                                                  data
                                                                                    .ok
                                                                                    .delivery
                                                                                    .recipient
                                                                                    .address
                                                                                    .street +
                                                                                  ", д. " +
                                                                                  data
                                                                                    .ok
                                                                                    .delivery
                                                                                    .recipient
                                                                                    .address
                                                                                    .house +
                                                                                  ", кв." +
                                                                                  data
                                                                                    .ok
                                                                                    .delivery
                                                                                    .recipient
                                                                                    .address
                                                                                    .apartment
                                                                            }</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                
                                                </tr>
                                            </tbody>
                                        </table>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
<tr>
    <td align="center" bgcolor="#00094D">

        <table width="100%" cellpadding="0" border="0" cellspacing="0" align="center" valign="top" bgcolor="#00007D"
            style="table-layout: fixed;border-collapse: collapse;color: #ffffff;background-color: #00007D;">

            <tbody>
                <tr>
                    <td height="64px"
                        style="padding: 0px 24px 0px 24px;border-top: 1px solid #2f2f2f;font-size: 10px;line-height: 16px;letter-spacing: .16px;">
                        <table width="624px" cellpadding="0" border="0" cellspacing="0" align="center" valign="top"
                            style="table-layout: fixed;border-collapse: collapse;">

                            <tbody>
                                <tr>
                                    <td width="100px" align="left" valign="middle" style="padding: 0px 12px 0px 12px;">
                                        <table cellpadding="0" border="0" cellspacing="0" align="left" valign="middle"
                                            style="table-layout: fixed;border-collapse: collapse;">

                                            <tbody>
                                                <tr>
                                                    <td align="left" valign="middle" style="padding-right: 12px;">
                                                        <a href="https://instagram.com/dev.queenbohemia/"
                                                            style="display: inline-block;padding: 12px 12px 12px 0px;color: #ffffff;text-decoration: none;">
                                                            <img src="https://dev.queenbohemia.ru/image/mail/inst.png"
                                                                width="16px" height="16px" alt="instagram"
                                                                style="display: block;">
                                                        </a>
                                                    </td>
                                                    <!-- <td align="left" valign="middle" style="padding-right: 12px;">
                                                        <a href="https://instagram.com/dev.queenbohemia/"
                                                            style="display: inline-block;padding: 12px 12px 12px 0px;color: #ffffff;text-decoration: none;">
                                                            <img src="http://dev.motorfirst.ru/img/mail/footer/facebook.png"
                                                                width="16px" height="16px" alt="facebook"
                                                                style="display: block;">
                                                        </a>
                                                    </td> -->
                                                </tr>

                                            </tbody>
                                        </table>
                                    </td>
                                    <td align="right" valign="middle"
                                        style="padding: 0px 12px 0px 12px; color: #ffffff;font-size: 10px;">
                                        <a
                                            href="https://dev.queenbohemia.ru"
                                            style="color: #ffffff;text-decoration: none;">queenbohemia.ru</a>&nbsp;©&nbsp;2013&nbsp;—&nbsp;2019
                                        Все права защищены.
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>

</tbody>
</table>


</body>

</html>`;
};

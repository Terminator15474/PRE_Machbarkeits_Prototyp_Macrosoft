@echo off
SET schemaName=%1
SET filename=%schemaName%.js

CD ./model/

echo import { Schema } from "mongoose"; > %filename%

echo. >> %filename%
echo export const %schemaName% = new Schema({ >> %filename%
echo }); >> %filename%
echo %schemaName%.set('toJSON', { >> %filename%
echo    transform: function (document, record) { >> %filename%
echo        for (const key in record) { >> %filename%
echo            if (key.startsWith('_')) { >> %filename%
echo                delete record[key]; >> %filename%
echo            } >> %filename%
echo        } >> %filename%
echo    } >> %filename%
echo }); >> %filename%

echo Done
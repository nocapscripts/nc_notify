local function openGui(text, type, length)
    guiEnabled = true
    SendNUIMessage({runProgress = true, colorsent = type, textsent = text, fadesent = length})
end
exports('sendnotify', openGui)

function closeGui()
    guiEnabled = false
    SendNUIMessage({closeProgress = true})
end
exports('closenotify', closeGui)


RegisterNetEvent('DoLongHudText', function(text, type, length)
    guiEnabled = true
    if not length then length = 6000 end
    if not type then type = 'warning' end
    SendNUIMessage({runProgress = true, colorsent = type, textsent = text, fadesent = length})


end)

-- Numbered event
RegisterNetEvent('DoShortHudText', function(text, type, length)
    local ntype
    if not length then lenght = 3000 end

    -- Success 1
    -- Info 2
    -- Error 3
    -- Warning 4

    if type == 4 then 
        ntype = "warning"

    elseif type == 3 then 
        ntype = "error"
    
    elseif type == 2 then 
        ntype = "info"

    elseif type == 1 then 
        ntype = "success"
    end





end)


RegisterCommand('testnotify', function()


    TriggerEvent('DoLongHudText', "ASDASDADADASDAADADADADADADD AASDADADASDAD ASDAS DASSA", "warning", 10000)


end, false)



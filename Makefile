include .launchpad/Makefile.header # see .launchpad/Makefile.documentation

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : $(LP_PREREQUISITE_TSC)
	echo "Generating snippets..."
	$(call lp.run, build/snippsel.js)
    ifneq "$(wildcard $(PE_PROGRAMS)/Projects/AutoHotkey/generated/)" ""
		   echo "Installing snippets..." \
		&& echo "- AutoHotkey" \
		&& cp -f dist/autohotkey/*.ahk "$(PE_PROGRAMS)/Projects/AutoHotkey/generated" \
		&& echo "- Talon" \
		&& cp -f dist/talon/*.talon "$(PE_PROGRAMS)/Utilities/Talon/Resources/UserScripts/generated" \
		&& echo "- VSCode" \
		&& cp -f dist/vscode/*.json "$(PE_PROGRAMS)/TextProcessing/VSCode/Resources/Extensions/david-04.vscode-1.0.0/snippets"
    endif

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.tsc-output)
# $(call lp.clean.npm-packages)
# $(call lp.clean.files, list files here...)

#-----------------------------------------------------------------------------------------------------------------------
include .launchpad/Makefile.footer

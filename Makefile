include .launchpad/Makefile.header # see .launchpad/Makefile.documentation

#-----------------------------------------------------------------------------------------------------------------------
# Installation
#-----------------------------------------------------------------------------------------------------------------------

INSTALL_CMD=

ifneq "$(wildcard ../AutoHotkey/generated/)" ""
INSTALL_CMD+= && echo "Installing AutoHotkey..." \
              && cp -f dist/autohotkey/*.ahk "../AutoHotkey/generated"
endif

# ifneq "$(wildcard ../../Utilities/Talon/Resources/UserScripts/generated)" ""
# INSTALL_CMD+= && echo "Installing Talon..." \
#               && cp -f dist/talon/*.talon "../../Utilities/Talon/Resources/UserScripts/generated"
# endif

ifneq "$(wildcard ../../TextProcessing/VSCode/Resources/Extensions/david-04.vscode-1.0.0/snippets/)" ""
INSTALL_CMD+= && echo "Installing VSCode..." \
              && cp -f dist/vscode/*.json "../../TextProcessing/VSCode/Resources/Extensions/david-04.vscode-1.0.0/snippets"
endif

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : build/.timestamp.tsc;
	echo "Generating snippets..." && $(call lp.run, build/snippsel.js) $(INSTALL_CMD)

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.tsc-output)

#-----------------------------------------------------------------------------------------------------------------------
include .launchpad/Makefile.footer
